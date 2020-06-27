import { Authentication } from '../../common/decorators/authentication';
import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';

class FlutterTesteResolver implements IResolver<any, any> {

    public getResolverName(): string {
        return 'flutterTeste';
    }

    @Authentication(true)
    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<any> {
        // this.counter++;

        context.pubSub.publish('newLiveUpdate', {newLiveUpdate: { message: `Counter ${ '0' }` }});

        return { message: `Hello from NodeJS! ${ 'input.name' }` };
    }

}


export default new FlutterTesteResolver();
