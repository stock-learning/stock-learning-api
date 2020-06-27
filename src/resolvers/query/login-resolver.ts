import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IResolver } from '../../common/graphql/iresolver';
import { LoginInputModel } from '../../models/login-input-model';
import { LoginOutputModel } from '../../models/login-output-model';

class LoginResolver implements IResolver<LoginInputModel, LoginOutputModel> {

    resolverName: string = 'login';

    public async resolve(input: LoginInputModel, request: Request, response: Response): Promise<LoginOutputModel> {
        const user = { _id: 'id do usuário', password: 'hash' }; // TODO - implementar busca pelo usuário
        if (!(await bcrypt.compare(input.password, user.password || ''))) {
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
