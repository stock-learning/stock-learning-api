import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';
import { LiveUpdateStockDataDocument } from '../documents/live-update-stock-data-document';
import moment from 'moment';

export class GetDailyCompanies implements IConsumer<any> {

    consumerName = 'get-daily-companies';

    public async consume(message: any): Promise<void> {
        const dailyRecords = (await LiveUpdateStockDataDocument.find({
            fetchTime : { $gt : moment().subtract(3, 'weeks').toDate() }
        })).map(doc => doc.toResource());

        const mapper = {isPredict: 1, stocks: dailyRecords};
        RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler(mapper);
    }

}

export default new GetDailyCompanies();