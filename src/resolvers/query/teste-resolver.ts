import { Request, Response } from 'express';
import { RabbitMQServer } from 'stock-learning-rabbitmq';
import { Authentication } from "../../common/decorators/authentication";
import { IResolver } from '../../common/graphql/iresolver';
import { CompanyDataDocument } from './../../documents/company-data-document';

class TesteResolver implements IResolver<any, any> {

    resolverName: string = 'testeQuery';

    @Authentication()
    async resolve(input: any, request: Request, response: Response): Promise<any> {
        const initials = (await CompanyDataDocument.find({}).select({ initials: 1, _id: 0 })).map(cd => cd.initials);
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaLiveUpdate({ initials });
        RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaHistoricData({ initials });
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaCompanyData();
    }

}


export default new TesteResolver();
