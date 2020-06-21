import loginResolver from '../../resolvers/action/login-resolver';
import testeResolver from '../../resolvers/query/teste-resolver';
import resolverCollectionBuilder from './resolver-collection-builder';


resolverCollectionBuilder.register(testeResolver);
resolverCollectionBuilder.register(loginResolver);

export default resolverCollectionBuilder.build();
