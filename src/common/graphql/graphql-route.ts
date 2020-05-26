import { Router } from 'express';
import graphqlHttp from 'express-graphql';
import * as fs from 'fs';
import { buildSchema } from 'graphql';
import * as path from 'path';
import handleError from "./handle-error";
import resolvers from "./resolvers";

const graphqlRouter = Router();

graphqlRouter.use('/graphql', graphqlHttp({
    schema: buildSchema(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'schema.graphql'), 'utf8')),
    rootValue: resolvers,
    graphiql: !!process.env.GRAPHIQL,
    customFormatErrorFn: handleError
}))

export default graphqlRouter;
