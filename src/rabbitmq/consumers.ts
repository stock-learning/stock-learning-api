import helloWorldConsumer from '../consumers/hello-world/hello-world-consumer';
import consumerCollectionBuilder from './consumer-collection-builder';
import persistInfomoneyIbvespaHistoricDataConsumer from '../consumers/hello-world/persist-infomoney-ibvespa-historic-data-consumer';


consumerCollectionBuilder.register(helloWorldConsumer);
consumerCollectionBuilder.register(persistInfomoneyIbvespaHistoricDataConsumer)

export default consumerCollectionBuilder.build();
