import helloWorldConsumer from '../consumers/hello-world/hello-world-consumer';
import consumerCollectionBuilder from './consumer-collection-builder';


consumerCollectionBuilder.register(helloWorldConsumer);

export default consumerCollectionBuilder.build();
