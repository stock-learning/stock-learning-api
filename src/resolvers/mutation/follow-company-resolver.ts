

import { IFollowCompanyInputModel } from 'src/models/follow-company-input-model';
import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';

class FollowCompanyResolver implements IResolver<IFollowCompanyInputModel, boolean> {

    public readonly resolverName = 'followCompany';

    public async resolve(parent: any, args: IFollowCompanyInputModel, context: GraphQLContext): Promise<boolean> {
        console.log(args);
        return args.isFollow;
    }

}


export default new FollowCompanyResolver();
