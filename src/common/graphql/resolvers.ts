import testeResolver from '../../resolvers/query/teste-resolver';
import resolverCollectionBuilder from './resolver-collection-builder';


resolverCollectionBuilder.register(testeResolver);

export default resolverCollectionBuilder.build();
