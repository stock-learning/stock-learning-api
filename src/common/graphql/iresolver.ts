import { Request, Response } from 'express';


export interface IResolver<T, K> {
    resolverName: string;
    resolve(input: T, request: Request, response: Response): Promise<K>;
}
