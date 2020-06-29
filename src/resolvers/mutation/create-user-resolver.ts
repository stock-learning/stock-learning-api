import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import authenticationController from '../../controllers/authentication-controller';
import { IUserOutputModel } from '../../models/user-output-model';
import { UserDocument } from './../../documents/user-document';
import { IUserInputModel } from './../../models/user-input-model';

class CreateUserResolver implements IResolver<IUserInputModel, IUserOutputModel> {

    public readonly resolverName = 'createUser';

    public async resolve(parent: any, args: IUserInputModel, context: GraphQLContext): Promise<IUserOutputModel> {
        let doc = new UserDocument();
        doc.updateWith(args.user);
        doc.password = await authenticationController.hashPassword(args.user.password);
        doc = await doc.save();
        return {
            email: doc.email,
            name: doc.name
        };
    }
}


export default new CreateUserResolver();
