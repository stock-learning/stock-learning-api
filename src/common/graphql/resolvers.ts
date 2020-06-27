import flutterTesteResolver from '../../resolvers/query/flutter-teste-resolver';
import loginResolver from '../../resolvers/query/login-resolver';
import testeResolver from '../../resolvers/query/teste-resolver';
import resolverCollectionBuilder from './resolver-collection-builder';
import { NEW_LIVE_UPDATE } from './subscription-contants';


resolverCollectionBuilder.register(testeResolver);
resolverCollectionBuilder.register(loginResolver);
resolverCollectionBuilder.register(flutterTesteResolver);

resolverCollectionBuilder.registerSubscription(NEW_LIVE_UPDATE)

export default resolverCollectionBuilder.build();
