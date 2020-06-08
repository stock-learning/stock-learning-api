import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';

export class DailyPredictionStartupHandler implements IConsumer<any> {

    consumerName = 'daily-prediction-startup-handler';

    public async consume(message: any): Promise<void> {
        RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionStartupHandler();
    }

}

export default new DailyPredictionStartupHandler();