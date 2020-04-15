import { HelloWorldDocument } from "./../../documents/hello-world-document";


export class HelloWorldController {
    public async fetchAllResources(): Promise<any> {
        return (await HelloWorldDocument.find()).map(helloWorldModel => helloWorldModel.toResource());
    }

    public async createResource(): Promise<any> {
        const helloWorldModel = new HelloWorldDocument();
        helloWorldModel.helloWorld = 'Hello World';
        return (await helloWorldModel.save()).toResource();
    }
}

export default new HelloWorldController();
