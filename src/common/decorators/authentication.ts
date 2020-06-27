import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { proxyMethod } from "./proxy";


export const Authentication = (disable?: boolean) => {
    return proxyMethod((ctx: PropertyDescriptor, ...args: any[]): boolean => {
        if (disable) {
            console.warn('Authentication is disabled');
            return true;
        }
        if (args.length >= 3) {
            const req: Request | undefined = args[2]?.request;
            const res: Response | undefined = args[2]?.response;

            const authorizationHeader = req?.headers.authorization;
            if (!authorizationHeader) {
                return false;
            } else {
                const token = authorizationHeader.split('Bearer ').join('');
                try {
                    const decodedToken = verify(token, process.env.SECRET || '');
                    if (req) {
                        req.userId = (decodedToken as any).userId;
                    }
                    return true;
                } catch (err) {
                    console.log(`Invalid token ${token}!`)
                    return false;
                }
            }
        }
        console.error('Cannot resolve authentication token!', args);
        return false;
    }, () => {
        throw new Error('Unauthorized');
    });
}
