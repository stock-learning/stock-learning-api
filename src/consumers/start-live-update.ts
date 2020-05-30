import { IConsumer } from 'stock-learning-rabbitmq';

export class StartLiveUpdate implements IConsumer<any> {

    consumerName = 'start-live-update';

    public async consume(message: any): Promise<void> {
        // TODO
    }

}

export default new StartLiveUpdate();