import moment from 'moment';
import { IConsumer } from 'stock-learning-rabbitmq';
import { HistoricStockDataDocument } from './../documents/historic-stock-data-document';
import { IHistoricStockDataModel } from './../models/historic-stock-data-model';

export class YahooCompanyHistoricData implements IConsumer<any> {

    consumerName = 'yahoo-company-historic-data';

    public async consume(message: any): Promise<void> {
        if (message.stockData && !!message.stockData.length) {
            try {
                console.log('yahoo-company-historic-data');
                const validData = message.stockData.filter((sd: any) => !!sd && !!sd.name && !!sd.date);
                const mappedData = this.mapToCollectionFormat(validData);

                const stockDataToDelete: any = mappedData.map((sd: any) => {
                    return {
                        $and: [
                            { name: sd.name },
                            { date: sd.date },
                        ]
                    };
                });

                await HistoricStockDataDocument.deleteMany({ $or: stockDataToDelete });
                await HistoricStockDataDocument.insertMany(mappedData);

                // mappedData.forEach(async (sd: any) => {
                //     const toUpdate  = await HistoricStockDataDocument.findOne({ name: sd.name, date: sd.date });
                //     if (toUpdate) {
                //         toUpdate.updateWith(sd);
                //         await toUpdate.save();
                //     } else {
                //         await HistoricStockDataDocument.create(mappedData);
                //     }
                // });

            } catch(e) {
                console.log(e);
            }
        }
    }

    private mapToCollectionFormat(rawData: any[]): IHistoricStockDataModel[] {
        return rawData.map(rsd => {
            return rsd.name && rsd.date && {
                name: rsd.name,
                date: moment(rsd.date, 'YYYY/MM/DD').toDate(),
                open: +rsd.open || undefined,
                close: +rsd.close || undefined,
                variation: ((+rsd.open) && (+rsd.close) && ((+rsd.open) - (+rsd.close))) || undefined,
                min: +rsd.min || undefined,
                max: +rsd.max || undefined,
                volume: +rsd.volume || undefined,
                adjClose: +rsd.adjClose || undefined
            }
        }).filter(sd => !!sd);
    }

}

export default new YahooCompanyHistoricData();