import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IIdInputModel } from '../../models/id-input-model';

class UserFollowCompanyResolver implements IResolver<IIdInputModel, boolean> {

    public readonly resolverName = 'userFollowCompany';

    public async resolve(parent: any, args: IIdInputModel, context: GraphQLContext): Promise<boolean> {
        return false;
    }
}


export default new UserFollowCompanyResolver();
