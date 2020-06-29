import { IResolver } from '../../common/graphql/iresolver';
import newLiveUpdateResolver from '../subscription/new-live-update-resolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { LiveUpdateStockDataController } from '../../controllers/live-update-stock-data-controller';

class FlutterTesteResolver implements IResolver<any, any> {

    public readonly resolverName = 'timeline';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<any> {
        const content = new LiveUpdateStockDataController().getAsyncData();
        context.pubSub.publish(newLiveUpdateResolver.resolverName, {newLiveUpdate: {data: content }});
        return { data: content };
    }

}


export default new FlutterTesteResolver();
