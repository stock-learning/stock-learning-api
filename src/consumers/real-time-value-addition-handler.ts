import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';

export class RealTimeValueAdditionHandler implements IConsumer<any> {

    consumerName = 'real-time-value-addition-handler';

    public async consume(message: any[]): Promise<void> {
        RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler({isPredict: true, stocks: message});
    }

}

export default new RealTimeValueAdditionHandler();