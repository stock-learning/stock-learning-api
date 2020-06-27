import { Request, Response } from 'express';
import { Authentication } from '../../common/decorators/authentication';
import { IResolver } from '../../common/graphql/iresolver';

class FlutterTesteResolver implements IResolver<any, any> {

    resolverName: string = 'flutterTeste';

    @Authentication()
    public async resolve(input: any, request: Request, response: Response): Promise<any> {
        return { message: `Hello from NodeJS! ${ input.name }` };
    }

}


export default new FlutterTesteResolver();
