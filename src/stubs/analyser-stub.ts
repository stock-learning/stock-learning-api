import { IHelloWorldModel } from './../models/hello-world-model';
import rabbitmq from '../infra/rabbitmq';

export class AnalyserStub {

    public helloWorld(content: IHelloWorldModel): boolean {
        return rabbitmq.sendMessage(process.env.ANALYSER_QUEUE_NAME || '', 'hello-world',  content);
    }

}

const singleton = new AnalyserStub();
export default function analyserStub() : AnalyserStub { return singleton; };
