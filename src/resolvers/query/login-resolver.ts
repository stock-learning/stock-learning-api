import { IResolver } from '../../common/graphql/iresolver';
import authenticationController from '../../controllers/authentication-controller';
import { LoginInputModel } from '../../models/login-input-model';
import { LoginOutputModel } from '../../models/login-output-model';
import { GraphQLContext } from './../../common/graphql/graphql-context';

class LoginResolver implements IResolver<LoginInputModel, LoginOutputModel> {

    public readonly resolverName = 'login';

    public async resolve(parent: any, args: LoginInputModel, context: GraphQLContext): Promise<any> {
        const user = { _id: 'id do usuário', password: 'hash' }; // TODO - implementar busca pelo usuário
        if ((await authenticationController.isPasswordCorrect(args.password, user.password || ''))) {
            return { success: false };
        } else {
            return { success: true, token: authenticationController.generateToken(user._id) };
        }
    }

}


export default new LoginResolver();
