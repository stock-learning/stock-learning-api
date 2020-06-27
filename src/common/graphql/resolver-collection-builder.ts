import { GraphQLContext } from './graphql-context';
import { IResolver } from './iresolver';

class ResolverCollectionBuilder {

    private _resolvers: any;

    constructor() {
        this._resolvers = {};
    }

    public build(): any {
        return { ...this._resolvers };
    }

    public registerQuery(resolver: IResolver<any, any>): void {
        if (!this._resolvers.Query) {
            this._resolvers.Query = {};
        }
        if (this._resolvers.Query[resolver.getResolverName()]) {
            throw new Error(`Query name '${resolver.getResolverName()}' is already being used`);
        } else {
            this._resolvers.Query[resolver.getResolverName()] = resolver.resolve;
        }
    }

    public registerMutation(resolver: IResolver<any, any>): void {
        if (!this._resolvers.Mutation) {
            this._resolvers.Mutation = {};
        }
        if (this._resolvers.Mutation[resolver.getResolverName()]) {
            throw new Error(`Mutation name '${resolver.getResolverName()}' is already being used`);
        } else {
            this._resolvers.Mutation[resolver.getResolverName()] = resolver.resolve;
        }
    }

    public registerSubscription(resolver: IResolver<any, AsyncIterator<any>>): void {
        if (!this._resolvers.Subscription) {
            this._resolvers.Subscription = {};
        }
        if (this._resolvers.Subscription[resolver.getResolverName()]) {
            throw new Error(`Subscription name '${resolver.getResolverName()}' is already being used`);
        } else {
            this._resolvers.Subscription[resolver.getResolverName()] = {
                subscribe(_ : any, __ : any, context : GraphQLContext) {
                    return resolver.resolve(_, __, context);
                }
            };
        }
    }

}


export default new ResolverCollectionBuilder();
