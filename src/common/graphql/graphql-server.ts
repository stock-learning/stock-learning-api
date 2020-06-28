import { ApolloServer } from 'apollo-server';
import * as fs from 'fs';
import { PubSub } from 'graphql-subscriptions';
import * as path from 'path';
import { ConnectionContext } from 'subscriptions-transport-ws';
import WebSocket from 'ws';
// import authenticationController from '../../controllers/authentication-controller';


export const graphqlTypeDefs = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'schema.graphql'), 'utf8');

const pubSub = new PubSub();

export function buildApolloServer(resolvers: any): ApolloServer {
    return new ApolloServer({
        typeDefs: graphqlTypeDefs,
        resolvers,
        context: params => {
            return {
                request: params.req,
                response: params.res,
                pubSub,
            };
        },
        subscriptions: {
            onConnect: async (connectionParams: any, webSocket: WebSocket, context: ConnectionContext) => {
                console.log('conectou', connectionParams.authToken);

                // await authenticationController.authenticateToken(connectionParams.authToken);
            }
        }
    });
}

export function globalPubSub(): PubSub {
    return pubSub;
}
