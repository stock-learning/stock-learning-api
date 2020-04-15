import { IConsumer } from './iconsumer';

class ConsumerCollectionBuilder {

    private _consumers: any;

    constructor() {
        this._consumers = {};
    }

    public build(): any {
        return { ...this._consumers };
    }


    public register(consumer: IConsumer<any>): void {
        if (this._consumers[consumer.consumerName]) {
            throw new Error(`Consumer name '${consumer.consumerName}' is already being used`);
        } else {
            this._consumers[consumer.consumerName] = consumer.consume;
        }
    }

}

export default new ConsumerCollectionBuilder();
