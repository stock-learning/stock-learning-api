import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';

export class DailyPredictionClosingHandler implements IConsumer<any> {

    consumerName = 'daily-prediction-closing-handler';

    public async consume(message: any): Promise<void> {
        RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionClosingHandler();
    }

}

export default new DailyPredictionClosingHandler();