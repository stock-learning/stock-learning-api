import { ITweetsInputModel } from 'src/models/tweets-input-model';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { TweetDocument } from '../../documents/tweet-document';
import { ITweetDocument, ITweetResource } from './../../documents/tweet-document';

class TweetsResolver implements IResolver<ITweetsInputModel, ITweetResource[]> {

    public readonly resolverName = 'tweets';

    public async resolve(parent: any, args: ITweetsInputModel, context: GraphQLContext): Promise<ITweetResource[]> {
        if (args.initials) {
            return (await TweetDocument.find({ relatedInitials: args.initials })).map((t: ITweetDocument) => t.toResource());
        } else {
            return (await TweetDocument.find({})).map((t: ITweetDocument) => t.toResource());
        }
    }
}


export default new TweetsResolver();
