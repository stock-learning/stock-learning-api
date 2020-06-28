import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { TweetDocument } from '../../documents/tweet-document';

class TweetsResolver implements IResolver<any, any> {

    public readonly resolverName = 'tweets';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<any> {
        return (await TweetDocument.find({})).map(t => t.toResource());
    }
}


export default new TweetsResolver();
