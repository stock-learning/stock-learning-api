import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';
import { LiveUpdateStockDataDocument } from '../documents/live-update-stock-data-document';

export class GetDailyCompanies implements IConsumer<any> {

    consumerName = 'get-daily-companies';

    public async consume(message: any): Promise<void> {
        const dailyRecords = (await LiveUpdateStockDataDocument.find({
            "createdAt" : { "$gt" : this.getDate()}
        })).map(doc => doc.toResource());
        RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler({isPredict: true, stocks: dailyRecords});
    }

    private getDate(): Date {
        const date = new Date();
        date.setHours(date.getHours() - 504); // 7 * 3 * 24
        return date;
    }

}

export default new GetDailyCompanies();