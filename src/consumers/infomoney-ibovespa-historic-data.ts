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

        const volumeToDouble = (str: string | undefined): number | undefined => {
            if (!str) {
                return undefined;
            }
            // TODO
            return 0;
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
                volume: volumeToDouble(rsd.volume),
            }
        }).filter(sd => !!sd);
    }

}

export default new InfomoneyIbovespaHistoricData();