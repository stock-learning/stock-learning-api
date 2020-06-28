import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IUserOutputModel } from '../../models/user-output-model';
import { IUserInputModel } from './../../models/user-input-model';

class CurrentUserMutationResolver implements IResolver<IUserInputModel, IUserOutputModel> {

    public readonly resolverName = 'currentUserMutation';

    public async resolve(parent: any, args: IUserInputModel, context: GraphQLContext): Promise<IUserOutputModel> {
        console.log(args);
        return {
            email: 'abc@gmail.com',
            name: 'José'
        };
    }
}


export default new CurrentUserMutationResolver();
