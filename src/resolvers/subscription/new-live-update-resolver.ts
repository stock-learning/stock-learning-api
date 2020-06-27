import { Authentication } from '../../common/decorators/authentication';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from "./../../common/graphql/iresolver";


export class NewLiveUpdateSubscriber implements IResolver<any, AsyncIterator<any>> {

    public getResolverName(): string {
        return 'newLiveUpdate';
    }

    @Authentication(true)
    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<AsyncIterator<any>> {
        return context.pubSub.asyncIterator(this.getResolverName());
    }

}

export default new NewLiveUpdateSubscriber();
