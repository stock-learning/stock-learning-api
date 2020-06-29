import { ApolloError } from 'apollo-server';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IFollowCompanyInputModel } from '../../models/follow-company-input-model';
import { toObjectId } from './../../common/utils/string-utils';
import { UserDocument } from './../../documents/user-document';



class FollowCompanyResolver implements IResolver<IFollowCompanyInputModel, boolean> {

    public readonly resolverName = 'followCompany';

    public async resolve(parent: any, args: IFollowCompanyInputModel, context: GraphQLContext): Promise<boolean> {
        const userId = toObjectId(context.request.userId);
        const result = await UserDocument.findOne({ _id: userId });
        if (!result) {
            throw new ApolloError('User not found', '404');
        } else {
            if (!result.followedCompanyInitials) {
                result.followedCompanyInitials = [];
            }
            if (args.isFollow) {
                result.followedCompanyInitials.push(args.initials);
            } else {
                result.followedCompanyInitials = result.followedCompanyInitials.filter(initials => initials !== args.initials);
            }

            await result.save();
            return args.isFollow;
        }
    }

}


export default new FollowCompanyResolver();
