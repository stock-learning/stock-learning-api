import rabbitmq from '../infra/rabbitmq';
import { IHelloWorldModel } from './../models/hello-world-model';

class ApiStub {

    public helloWorld(content: IHelloWorldModel): boolean {
        return rabbitmq.sendMessage(process.env.API_QUEUE_NAME || '', 'hello-world',  content);
    }

}

const singleton = new ApiStub();
export default function apiStub() : ApiStub { return singleton; };
