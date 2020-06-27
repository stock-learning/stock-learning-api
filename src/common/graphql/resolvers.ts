import flutterTesteResolver from '../../resolvers/query/flutter-teste-resolver';
import loginResolver from '../../resolvers/query/login-resolver';
import testeResolver from '../../resolvers/query/teste-resolver';
import newLiveUpdateResolver from '../../resolvers/subscription/new-live-update-resolver';
import resolverCollectionBuilder from './resolver-collection-builder';


resolverCollectionBuilder.registerQuery(testeResolver);
resolverCollectionBuilder.registerQuery(loginResolver);
resolverCollectionBuilder.registerQuery(flutterTesteResolver);
resolverCollectionBuilder.registerSubscription(newLiveUpdateResolver);

export default resolverCollectionBuilder.build();
