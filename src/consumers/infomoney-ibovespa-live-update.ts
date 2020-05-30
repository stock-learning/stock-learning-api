import { IConsumer } from 'stock-learning-rabbitmq';

export class InfomoneyIbovespaLiveUpdate implements IConsumer<any> {

    consumerName = 'infomoney-ibovespa-live-update';

    public async consume(message: any): Promise<void> {
        
    }

}

export default new InfomoneyIbovespaLiveUpdate();