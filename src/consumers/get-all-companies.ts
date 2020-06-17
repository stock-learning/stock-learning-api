import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';
import { HistoricStockDataDocument } from '../documents/historic-stock-data-document';

export class GetAllCompanies implements IConsumer<any> {

    consumerName = 'get-all-companies';

    public async consume(message: any): Promise<void> {
        const allRecords = (await HistoricStockDataDocument.find({})).map(doc => doc.toResource());
        const mapper = {isPredict: 0, stocks: allRecords};
        RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler(mapper);
    }

}

export default new GetAllCompanies();