import { IResolver } from '../../common/graphql/iresolver';
import { IInitialsInputModel } from '../../models/initials-input-model';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import liveUpdateStockDataController from './../../controllers/live-update-stock-data-controller';


class CompanyStockCurrentValueResolver implements IResolver<IInitialsInputModel, number> {

    public readonly resolverName = 'companyStockCurrentValue';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<number> {
        return liveUpdateStockDataController.fetchCurrentPriceByInitials(args.initials);
    }

}


export default new CompanyStockCurrentValueResolver();
