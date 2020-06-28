import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';

class FlutterTesteResolver implements IResolver<any, any> {

    public readonly resolverName = 'flutterTeste';

    private _counter: number = 0;

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<any> {
        this._counter++;

        context.pubSub.publish('newLiveUpdate', {newLiveUpdate: { message: `Counter ${ this._counter }` }});

        return { message: `Hello from NodeJS! ${ args.name }` };
    }

}


export default new FlutterTesteResolver();
