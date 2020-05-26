import { IConsumer } from 'stock-learning-rabbitmq';
import { StockDataDocument } from '../documents/stock-data-document';
import { IStockDataCollectionModel } from "../models/stock-data-collection-model";

export class InfomoneyIbovespaInitialLoad implements IConsumer<IStockDataCollectionModel> {

    consumerName = 'infomoney-ibovespa-initial-load';

    public async consume(message: IStockDataCollectionModel): Promise<void> {
        if (message.stockData) {
            const validData = message.stockData.filter(sd => !!sd.name && !!sd.date);
            const stockDataToDelete: any = validData.map(sd => {
                return {
                    $and: [
                        { name: sd.name },
                        { date: sd.date },
                    ]
                };
            });
            await StockDataDocument.deleteMany({ $or: stockDataToDelete })
            await StockDataDocument.create(message.stockData);
        }
    }

}

export default new InfomoneyIbovespaInitialLoad();