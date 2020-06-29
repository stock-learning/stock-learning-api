import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IInitialsInputModel } from '../../models/initials-input-model';
import { toObjectId } from './../../common/utils/string-utils';
import { UserDocument } from './../../documents/user-document';

class UserFollowCompanyResolver implements IResolver<IInitialsInputModel, boolean> {

    public readonly resolverName = 'userFollowCompany';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<boolean> {
        const userId = toObjectId(context.request.userId);
        const result = await UserDocument.findOne({ _id: userId });
        return !!result?.followedCompanyInitials?.filter(initials => initials === args.initials).length;
    }
}


export default new UserFollowCompanyResolver();
