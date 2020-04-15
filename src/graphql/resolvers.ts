import helloGraphqlMutationResolver from '../resolvers/mutation/hello-graphql-mutation-resolver';
import helloGraphqlQueryResolver from '../resolvers/query/hello-graphql-query-resolver';
import resolverCollectionBuilder from './resolver-collection-builder';


resolverCollectionBuilder.register(helloGraphqlQueryResolver);
resolverCollectionBuilder.register(helloGraphqlMutationResolver);


export default resolverCollectionBuilder.build();
