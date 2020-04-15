import { Request, Response } from 'express';
import helloWorldController from '../../controllers/helloworld/hello-world-controller';
import { Authentication } from "../../decorators/authentication";
import { IResolver } from '../../graphql/iresolver';
import { IHelloWorldModel } from "../../models/hello-world-model";

interface HelloGraphQLMutationInput {
    helloWorldInput: IHelloWorldModel
}

class HelloGraphQLMutationResolver implements IResolver<HelloGraphQLMutationInput, Promise<IHelloWorldModel | undefined>> {

    resolverName: string = 'helloGraphQLMutation';

    @Authentication()
    async resolve(input: HelloGraphQLMutationInput, request: Request, response: Response): Promise<IHelloWorldModel | undefined> {
       return helloWorldController.createResource()
    }

}


export default new HelloGraphQLMutationResolver();
