import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { IIdInputModel } from './../../models/id-input-model';


class CompanyStockCurrentValueResolver implements IResolver<IIdInputModel, number> {

    public readonly resolverName = 'companyStockCurrentValue';

    public async resolve(parent: any, args: IIdInputModel, context: GraphQLContext): Promise<number> {
        return 999.99;
    }

}


export default new CompanyStockCurrentValueResolver();
