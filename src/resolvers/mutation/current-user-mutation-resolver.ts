import { ApolloError } from 'apollo-server';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import authenticationController from '../../controllers/authentication-controller';
import { IUserOutputModel } from '../../models/user-output-model';
import { toObjectId } from './../../common/utils/string-utils';
import { UserDocument } from './../../documents/user-document';
import { IUserInputModel } from './../../models/user-input-model';

class CurrentUserMutationResolver implements IResolver<IUserInputModel, IUserOutputModel> {

    public readonly resolverName = 'currentUserMutation';

    public async resolve(parent: any, args: IUserInputModel, context: GraphQLContext): Promise<IUserOutputModel> {
        const userId = toObjectId(context.request.userId);
        const result = await UserDocument.findOne({ _id: userId });
        if (!result) {
            throw new ApolloError('User not found', '404');
        } else {
            result.email = args.user.email;
            result.name = args.user.name;
            result.password = await authenticationController.hashPassword(args.user.password);
            await result.save();
            return args.user;
        }
    }
}


export default new CurrentUserMutationResolver();
