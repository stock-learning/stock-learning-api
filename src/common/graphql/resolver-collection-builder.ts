import { PubSub } from 'graphql-subscriptions';
import { IResolver } from './iresolver';

class ResolverCollectionBuilder {

    private _resolvers: any;
    private _pubsub: PubSub;

    constructor() {
        this._resolvers = {};
        this._pubsub = new PubSub();
    }

    public build(): any {
        return { ...this._resolvers };
    }


    public register(resolver: IResolver<any, any>): void {
        if (this._resolvers[resolver.resolverName]) {
            throw new Error(`Resolver name '${resolver.resolverName}' is already being used`);
        } else {
            this._resolvers[resolver.resolverName] = resolver.resolve;
        }
    }

    public registerSubscription(subscriptionName: string): void {
        if (this._resolvers[subscriptionName]) {
            throw new Error(`Subscription name '${subscriptionName}' is already being used`);
        } else {
            this._resolvers[subscriptionName] = () => this._pubsub.asyncIterator(subscriptionName);
        }
    }

}

export default new ResolverCollectionBuilder();
