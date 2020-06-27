import { GraphQLContext } from './graphql-context';


export interface IResolver<T, K> {
    getResolverName(): string;
    resolve(parent: any, args: T, context: GraphQLContext): Promise<K>;
}
