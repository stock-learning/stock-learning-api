import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';

export class RealTimeValueAdditionHandlger implements IConsumer<any> {

    consumerName = 'real-time-value-addition-handler';

    public async consume(message: any[]): Promise<void> {
        RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler({isPredict: false, stocks: message});
    }

}

export default new RealTimeValueAdditionHandlger();