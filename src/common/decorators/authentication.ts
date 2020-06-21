import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Proxy } from "./proxy";


export function Authentication(disable?: boolean) {
    return Proxy.builder()
        .condition((ctx: PropertyDescriptor, args: IArguments): boolean => {
            if (disable) {
                console.warn('Authentication is disabled');
                return true;
            }
            if (args.length >= 3) {
                const req: Request = args[1];
                const res: Response = args[2];

                const authorizationHeader = req.get('Authorization');
                if (!authorizationHeader) {
                    return false;
                } else {
                    const token = authorizationHeader.split('Bearer ').join('');
                    try {
                        const decodedToken = verify(token, process.env.SECRET || '');
                        req.userId = (decodedToken as any).userId;
                        return true;
                    } catch (err) {
                        return false;
                    }
                }
            }
            console.warn('Authentication not implemented!');
            return true;
        })
        .reject(() => {
            throw new Error('Unauthorized');
        })
        .build();
}
