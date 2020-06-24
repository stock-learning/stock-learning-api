import { Router } from 'express';
import graphqlHttp from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, execute, subscribe } from 'graphql';
import * as path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import handleError from "./handle-error";
import resolvers from "./resolvers";


export const graphqlSchema = buildSchema(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'schema.graphql'), 'utf8'));

export const graphqlRouter = Router().use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: !!process.env.GRAPHIQL,
    customFormatErrorFn: handleError
}));

export function buildSubscriptionServer (server: any) {
    return new SubscriptionServer({
            execute,
            subscribe,
            schema: graphqlSchema,
        }, {
            server,
            path: '/subscriptions',
        });
};
