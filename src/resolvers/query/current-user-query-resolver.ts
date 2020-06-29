import { ApolloError } from 'apollo-server';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IUserOutputModel } from '../../models/user-output-model';
import { toObjectId } from './../../common/utils/string-utils';
import { UserDocument } from './../../documents/user-document';

class CurrentUserQueryResolver implements IResolver<any, IUserOutputModel> {

    public readonly resolverName = 'currentUserQuery';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<IUserOutputModel> {
        const userId = toObjectId(context.request.userId);
        const result = await UserDocument.findOne({ _id: userId });
        if (!result) {
            throw new ApolloError('User nor found!', '404');
        } else {
            return {
                email: result.email,
                name: result.name,
            };
        }
    }
}


export default new CurrentUserQueryResolver();
