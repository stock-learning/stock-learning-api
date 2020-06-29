import { ApolloError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { verify, VerifyErrors } from 'jsonwebtoken';


export class AuthenticationController {

    public async authenticateRequest(request: Request): Promise<void> {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            throw new ApolloError('Unauthorized', '401');
        } else {
            const token = authorizationHeader.split('Bearer ').join('');
            try {
                const decodedToken = await this.verifyAsync(token);
                if (request) {
                    request.userId = (decodedToken as any).userId;
                }
            } catch (err) {
                console.error(`Invalid token ${token}!`)
                throw new ApolloError('Unauthorized', '401');
            }
        }
    }

    public async authenticateToken(token: string): Promise<void> {
        try {
            await this.verifyAsync(token);
        } catch (err) {
            console.error(`Invalid token ${token}!`)
            throw new ApolloError('Unauthorized', '401');
        }
    }

    public async isPasswordCorrect(rawPassword: string, hashToCompare: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, hashToCompare);
    }

    public async generateToken(userId: string) {
        return jwt.sign({ userId }, process.env.SECRET || '', { expiresIn: '1h' });
    }

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    private async verifyAsync(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.SECRET || '', (error: VerifyErrors | null, decoded: object | undefined) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}


export default new AuthenticationController();
