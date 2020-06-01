import moment from 'moment';
import { IConsumer } from 'stock-learning-rabbitmq';
import { HistoricStockDataDocument } from '../documents/historic-stock-data-document';
import { IHistoricStockDataModel } from './../models/historic-stock-data-model';

export class InfomoneyIbovespaHistoricData implements IConsumer<any> {

    consumerName = 'infomoney-ibovespa-historic-data';

    public async consume(message: any): Promise<void> {
        if (message.stockData && !!message.stockData.length) {
            try {
                const validData = message.stockData.filter((sd: any) => !!sd && !!sd.name && !!sd.date);
                const mappedData = this.mapToCollectionFormat(message.stockData);
                const stockDataToDelete: any = mappedData.map((sd: any) => {
                    return {
                        $and: [
                            { name: sd.name },
                            { date: sd.date },
                        ]
                    };
                });
                await HistoricStockDataDocument.deleteMany({ $or: stockDataToDelete })
                await HistoricStockDataDocument.create(mappedData);
            } catch(e) {
                console.log(e);
            }
        }
    }

    private mapToCollectionFormat(rawData: any[]): IHistoricStockDataModel[] {
        const strToDouble = (str: string | undefined): number | undefined => {
            if (!str) {
                return undefined;
            }
            return +str.replace(',', '.');
        }

        const volumeToNumber = (str: string | undefined): number | undefined => {
            if (!str) {
                return undefined;
            }
            const handleSubStr = (subStr: string, zeros: string) => {
                if (str.includes(subStr)) {
                    const split = str.split(',');
                    let aux = split[1].replace(subStr, '');
                    if (aux.length === 1) {
                        aux = `${aux}00`
                    }
                    if (aux.length === 2) {
                        aux = `${aux}0`
                    }
                    if (aux.length === 3) {
                        aux = `${aux}`
                    }
                    return +`${split[0]}${aux}`;
                }
            }
            const result = handleSubStr('K', '') || handleSubStr('M', '000') || handleSubStr('B', '000000');
            if (!result) {
                console.warn(`Could not map ${str}`);
                return undefined;
            } else {
                return result;
            }
        }

        return rawData.map(rsd => {
            return rsd.name && rsd.date && {
                name: rsd.name,
                date: moment(rsd.date, 'DD/MM/YYYY').toDate(),
                open: strToDouble(rsd.open),
                close: strToDouble(rsd.close),
                variation: strToDouble(rsd.variation),
                min: strToDouble(rsd.min),
                max: strToDouble(rsd.max),
                volume: volumeToNumber(rsd.volume),
            }
        }).filter(sd => !!sd);
    }

}

export default new InfomoneyIbovespaHistoricData();