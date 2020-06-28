import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IUserOutputModel } from '../../models/user-output-model';

class CurrentUserQueryResolver implements IResolver<any, IUserOutputModel> {

    public readonly resolverName = 'currentUserQuery';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<IUserOutputModel> {
        return {
            email: 'abc@gmail.com',
            name: 'José'
        };
    }
}


export default new CurrentUserQueryResolver();
