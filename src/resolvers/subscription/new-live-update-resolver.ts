import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from "./../../common/graphql/iresolver";


export class NewLiveUpdateSubscriber implements IResolver<any, AsyncIterator<any>> {

    public readonly resolverName = 'newLiveUpdate';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<AsyncIterator<any>> {
        return context.pubSub.asyncIterator(this.resolverName);
    }

}

export default new NewLiveUpdateSubscriber();
