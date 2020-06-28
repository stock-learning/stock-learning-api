import { GraphQLContext } from '../../common/graphql/graphql-context';
import { IResolver } from '../../common/graphql/iresolver';
import { IInitialsInputModel } from '../../models/initials-input-model';
import { ICompanyDataModel } from './../../models/company-data-model';

class CompanyDataByInitialsResolver implements IResolver<IInitialsInputModel, ICompanyDataModel> {

    public readonly resolverName = 'companyDataByInitials';

    public async resolve(parent: any, args: IInitialsInputModel, context: GraphQLContext): Promise<ICompanyDataModel> {
        return {
            initials: 'TIMP3',
            name: 'TIM Participações',
            logoUrl: 'https://logodownload.org/wp-content/uploads/2015/02/tim-logo-0.png',
            type: 'AÇÕES',
            sector: 'Telecomunicações',
            description: 'A TIM Participações é uma empresa de telecomunicações. Ela atua com telefonia móvel, fixa e acesso à internet via modem, tablet, celular, além da banda larga fixa. A empresa é líder no segmento 4G.No triênio 2018-2020, a companhia trabalha com um plano de cerca de investimentos de R$12 bilhões na operação. O foco é expandir a infraestrutura fixa e móvel.A operadora foi a primeira do mercado a apostar em novos formatos de ofertas. Entre as inovações está a tarifação por dia de uso para voz e internet móvel. Ela também introduziu a cobrança mensal dos planos via cartão de crédito.A TIM pertence ao Grupo Telecom Itália, que iniciou suas atividades no Brasil em 1998. Em 2000 a TIM adquire licenças nas Bandas D e E de telefonia móvel celular. Em 2002 a companhia é a primeira operadora a ter cobertura GSM no país.Em 2003 a Bitel incorporou a TIM Brasil S.A. e passou a ser denominada Tim Brasil Serviços e Participações S.A. Em 2004 as ações da TIM Participações passaram a ser negociadas na Bovespa, com o nome de pregão TIM PART. S.A.No ano de 2007 a TIM adquiriu licença de telefonia fixa nacional. Em 2009 a companhia adquire a Intelig. Em 2011 ela ingressa no Novo Mercado da Bolsa de Valores.Atualmente a empresa está listada com ações ordinárias (TIMP3) e também está presente no mercado fracionado (TIMP3F).'
        };
    }
}


export default new CompanyDataByInitialsResolver();
