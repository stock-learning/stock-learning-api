import { GraphQLContext } from './graphql-context';


export interface IResolver<T, K> {
    readonly resolverName: string;
    resolve(parent: any, args: T, context: GraphQLContext): Promise<K>;
}
