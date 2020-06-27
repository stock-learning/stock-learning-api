import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IResolver } from '../../common/graphql/iresolver';
import { LoginInputModel } from '../../models/login-input-model';
import { LoginOutputModel } from '../../models/login-output-model';
import { GraphQLContext } from './../../common/graphql/graphql-context';

class LoginResolver implements IResolver<LoginInputModel, LoginOutputModel> {

    public getResolverName(): string {
        return 'login';
    }

    public async resolve(parent: any, args: LoginInputModel, context: GraphQLContext): Promise<any> {
        const user = { _id: 'id do usuário', password: 'hash' }; // TODO - implementar busca pelo usuário
        if (!(await bcrypt.compare(args.password, user.password || ''))) {
            return { success: false };
        } else {
            const token = jwt.sign(
                {
                  userId: user._id,
                },
                process.env.SECRET || '',
                {
                  expiresIn: '1h'
                }
              );
            return { success: true, token };
        }
    }

}


export default new LoginResolver();
