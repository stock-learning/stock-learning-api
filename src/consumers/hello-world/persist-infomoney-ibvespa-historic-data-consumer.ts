import { StockDataDocument } from '../../documents/stock-data-document';
import { IConsumer } from '../../rabbitmq/iconsumer';
import { IStockDataCollectionModel } from "../../models/stock-data-collection-model";

export class PersistInfomoneyIbovespaHistoricDataConsumer implements IConsumer<IStockDataCollectionModel> {

    consumerName = 'persist-infomoney-ibovespa-historic-data';

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

export default new PersistInfomoneyIbovespaHistoricDataConsumer();