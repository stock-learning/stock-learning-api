import { Router } from 'express';
import graphqlHttp from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, execute, subscribe } from 'graphql';
import { graphiqlExpress } from 'graphql-server-express'; //graphqlExpress
import { PubSub } from 'graphql-subscriptions';
import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import handleError from './handle-error';
import resolvers from "./resolvers";


export const graphqlTypeDefs = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'schema.graphql'), 'utf8');

export const graphqlSchema = buildSchema(graphqlTypeDefs);

export const graphqlRouter = Router().use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: !!process.env.GRAPHIQL,
    customFormatErrorFn: handleError
}));

export const graphiqlRouter = Router().use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

export function buildSubscriptionServer(server: any) {
    return new SubscriptionServer({
            execute,
            subscribe,
            schema: graphqlSchema,
        }, {
            server,
            path: '/subscriptions',
        });
};

export function buildGraphQLServer(): GraphQLServer {
    const pubSub = new PubSub();
    return new GraphQLServer({
        typeDefs: graphqlTypeDefs,
        resolvers,
        context: params => {
            return {
                request: params.request,
                response: params.response,
                pubSub,
            };
        }
      });
}
