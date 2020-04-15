import { IResolver } from './iresolver';

class ResolverCollectionBuilder {

    private _resolvers: any;

    constructor() {
        this._resolvers = {};
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

}

export default new ResolverCollectionBuilder();
