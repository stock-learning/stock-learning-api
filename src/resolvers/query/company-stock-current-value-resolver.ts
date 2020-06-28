import { IResolver } from '../../common/graphql/iresolver';
import { IInitialsInputModel } from '../../models/initials-input-model';
import { GraphQLContext } from './../../common/graphql/graphql-context';


class CompanyStockCurrentValueResolver implements IResolver<IInitialsInputModel, number> {

    public readonly resolverName = 'companyStockCurrentValue';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<number> {
        return 999.99;
    }

}


export default new CompanyStockCurrentValueResolver();
