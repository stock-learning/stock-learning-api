import { Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';

export interface GraphQLContext {
    request: Request;
    response: Response;
    pubSub: PubSub;
}
