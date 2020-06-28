import moment from 'moment';
import { IConsumer, RabbitMQServer } from 'stock-learning-rabbitmq';
import { LiveUpdateStockDataDocument } from './../documents/live-update-stock-data-document';
import { ILiveUpdateStockDataModel } from './../models/live-update-stock-data-model';
import newLiveUpdateResolver from '../resolvers/subscription/new-live-update-resolver';
import { LiveUpdateStockDataController } from '../controllers/live-update-stock-data-controller';
import { globalPubSub } from '../common/graphql/graphql-server';

export class InfomoneyIbovespaLiveUpdate implements IConsumer<any> {

    consumerName = 'infomoney-ibovespa-live-update';

    public consume(message: any): void {
        if (message && message.liveUpdateStockData && message.liveUpdateStockData.length) {
            const toCreate = message.liveUpdateStockData
                    .filter((rawData: any) => !!rawData.name && !!rawData.fetchTime)
                    .map((rawData: any): ILiveUpdateStockDataModel => {

                        const strToDouble = (str: string | undefined): number | undefined => {
                            if (!str) {
                                return 0;
                            }
                            if (str.includes('%')) {
                                return +str.split('%').join('');
                            } else {
                                return +str.split('.').join('')
                                           .split(',').join('.');
                            }
                        }

                        const doc: ILiveUpdateStockDataModel = new LiveUpdateStockDataDocument();
                        doc.name = rawData.name; // string;
                        doc.fetchTime = moment(rawData.fetchTime).toDate(); // date;
                        doc.close = strToDouble(rawData.close); // double;
                        doc.open = strToDouble(rawData.open); // double;
                        doc.business = strToDouble(rawData.business); // double;
                        doc.quantity = strToDouble(rawData.quantity); // double;
                        doc.volume = +rawData.volume; // number;
                        doc.min = strToDouble(rawData.min); // double;
                        doc.max = strToDouble(rawData.max); // double;
                        doc.variationDay = strToDouble(rawData.variationDay); // double;
                        doc.variationMonth = strToDouble(rawData.variationMonth); // double;
                        doc.variationYear = strToDouble(rawData.variationYear); // double;
                        doc.variation52weeks = strToDouble(rawData.variation52weeks); // double;
                        return doc;

                    });

            LiveUpdateStockDataDocument.insertMany(toCreate);
            RabbitMQServer.getInstance().getAnalyserStub().realTimeValueAdditionHandler({isPredict: 1, stocks: toCreate});
            globalPubSub().publish(newLiveUpdateResolver.resolverName, {newLiveUpdate: { data: new LiveUpdateStockDataController().getAsyncData() }});
        }
    }

}

export default new InfomoneyIbovespaLiveUpdate();