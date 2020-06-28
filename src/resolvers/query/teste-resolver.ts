import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { CompanyDataDocument } from './../../documents/company-data-document';

class TesteResolver implements IResolver<any, any> {

    public readonly resolverName = 'testeQuery';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<any> {

        const initials = (await CompanyDataDocument.find({}).select({ initials: 1, _id: 0 })).map(cd => cd.initials);
        console.log(initials);

        return 'ola';
    }
}


export default new TesteResolver();
