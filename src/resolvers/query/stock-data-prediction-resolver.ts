import moment from 'moment';
import { IStockDataPredictionOutput } from 'src/models/stock-data-prediction-output-model';
import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { IInitialsInputModel } from './../../models/initials-input-model';

class StockDataPredictionResolver implements IResolver<IInitialsInputModel, IStockDataPredictionOutput[]> {

    public readonly resolverName = 'stockDataPrediction';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<IStockDataPredictionOutput[]> {
        return [
            {
                isSell: true,
                value: 50.00,
                dateTime: moment().subtract(2, 'days').toDate()
            },
            {
                isSell: false,
                value: 40.00,
                dateTime: moment().subtract(1, 'day').toDate()
            },
            {
                isSell: true,
                value: 55.50,
                dateTime: moment().toDate()
            },
        ];
    }

}


export default new StockDataPredictionResolver();
