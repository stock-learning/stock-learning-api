import authenticationController from '../../controllers/authentication-controller';
import { GraphQLContext } from './graphql-context';
import { IResolver } from './iresolver';


export class Resolvers {

    public static builder(): Resolvers {
        return new Resolvers();
    }

    private _resolvers: any;

    private constructor() {
        this._resolvers = {};
    }

    public build(): any {
        return { ...this._resolvers };
    }

    public registerQuery(resolver: IResolver<any, any>): Resolvers {
        this._init('Query');
        this._validate('Query', resolver.resolverName);
        this._register('Query', resolver);
        return this;
    }

    public registerProtectedQuery(resolver: IResolver<any, any>): Resolvers {
        this._init('Query');
        this._validate('Query', resolver.resolverName);
        this._registerProtected('Query', resolver);
        return this;
    }

    public registerMutation(resolver: IResolver<any, any>): Resolvers {
        this._init('Mutation');
        this._validate('Mutation', resolver.resolverName);
        this._register('Mutation', resolver);
        return this;
    }

    public registerProtectedMutation(resolver: IResolver<any, any>): Resolvers {
        this._init('Mutation');
        this._validate('Mutation', resolver.resolverName);
        this._registerProtected('Mutation', resolver);
        return this;
    }

    public registerSubscription(resolver: IResolver<any, AsyncIterator<any>>): Resolvers {
        this._init('Subscription');
        this._validate('Subscription', resolver.resolverName);
        this._resolvers.Subscription[resolver.resolverName] = {
            subscribe(_ : any, __ : any, context : GraphQLContext) {
                return resolver.resolve(_, __, context);
            }
        };
        return this;
    }

    private _init(section: string) {
        if (!this._resolvers[section]) {
            this._resolvers[section] = {};
        }
    }

    private _validate(section: string, resolverName: string) {
        if (this._resolvers[section][resolverName]) {
            throw new Error(`Subscription name '${resolverName}' is already being used`);
        }
    }

    private _register(section: string, resolver: IResolver<any, any>) {
        this._resolvers[section][resolver.resolverName] = (parent: any, args: any, context: GraphQLContext) => {
            return resolver.resolve(parent, args, context);
        }
    }

    private _registerProtected(section: string, resolver: IResolver<any, any>) {
        this._resolvers[section][resolver.resolverName] = async (parent: any, args: any, context: GraphQLContext) => {
            await authenticationController.authenticateRequest(context.request);
            console.warn('Authentication not being executed!');
            return resolver.resolve(parent, args, context);
        };
    }

}
