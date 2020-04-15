
import { IHelloWorldModel } from "./../../models/hello-world-model";
import { IConsumer } from "./../../rabbitmq/iconsumer";

export class HelloWorldConsumer implements IConsumer<IHelloWorldModel> {

    consumerName = 'hello-world';

    public async consume(message: IHelloWorldModel): Promise<void> {
        console.log('Hello World', message);
    }

}

export default new HelloWorldConsumer();