import { IConsumer } from 'stock-learning-rabbitmq';
import { PredictionMovementDocument } from '../documents/prediction-movement-document';

export class LivePredictionMovement implements IConsumer<any> {

    consumerName = 'live-prediction-movement';

    public async consume(message: any): Promise<void> {
        if (message) {
            try {
                await PredictionMovementDocument.create(message);
            } catch(e) {
                console.log(e);
            }
        }
    }
}

export default new LivePredictionMovement();