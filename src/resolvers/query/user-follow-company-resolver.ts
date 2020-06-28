import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IInitialsInputModel } from '../../models/initials-input-model';

class UserFollowCompanyResolver implements IResolver<IInitialsInputModel, boolean> {

    public readonly resolverName = 'userFollowCompany';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<boolean> {
        return false;
    }
}


export default new UserFollowCompanyResolver();
