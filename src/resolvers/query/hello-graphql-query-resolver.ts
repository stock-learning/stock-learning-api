import { Request, Response } from 'express';
import helloWorldController from '../../controllers/helloworld/hello-world-controller';
import { Authentication } from "../../decorators/authentication";
import { IResolver } from '../../graphql/iresolver';
import { IHelloWorldModel } from "../../models/hello-world-model";
import webScrappingStub from '../../stubs/web-scrapping-stub';

class HelloGraphQLQueryResolver implements IResolver<any, Promise<IHelloWorldModel[]>> {

    resolverName: string = 'helloGraphQLQuery';
 
    @Authentication()
    async resolve(input: any, request: Request, response: Response): Promise<IHelloWorldModel[]> {
        console.log('aqui');
        webScrappingStub().syncInfomoneyIbvespa();
        return helloWorldController.fetchAllResources();
    }

}


export default new HelloGraphQLQueryResolver();
