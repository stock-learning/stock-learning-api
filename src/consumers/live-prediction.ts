import { IConsumer } from 'stock-learning-rabbitmq';
import { PredictionDocument } from '../documents/prediction-document';
import { PredictionMovementDocument } from '../documents/prediction-movement-document';

export class LivePrediction implements IConsumer<any> {

    consumerName = 'live-prediction';

    public async consume(message: any): Promise<void> {
        if (message) {
            try {
                await PredictionDocument.create(message);
                await PredictionMovementDocument.deleteMany({initials: message.initials});
            } catch(e) {
                console.log(e);
            }
        }
    }
}

export default new LivePrediction();