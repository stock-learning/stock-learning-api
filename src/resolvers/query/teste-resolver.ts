import { Request, Response } from 'express';
import { RabbitMQServer } from 'stock-learning-rabbitmq';
import { Authentication } from "../../common/decorators/authentication";
import { IResolver } from '../../common/graphql/iresolver';
import { TrackedTwitterAccountDocument } from './../../documents/tracked-twitter-account-document';
import { ITrackedTwitterAccountModel } from './../../models/tracked-twitter-account-model';

class TesteResolver implements IResolver<any, any> {

    resolverName: string = 'testeQuery';

    @Authentication()
    async resolve(input: any, request: Request, response: Response): Promise<any> {

        // const initials = (await CompanyDataDocument.find({}).select({ initials: 1, _id: 0 })).map(cd => cd.initials);
        // console.log(initials);
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaLiveUpdate({ initials });
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaHistoricData({ initials });
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaCompanyData();

        // const companies = (await CompanyDataDocument.find({}).select({ initials: 1, name: 1, _id: 0 })).map(cd => {
        //         return {companyInitials: cd.initials, companyName: cd.name};
        // });

        // (await HistoricStockDataDocument.find()).map(doc => {
        //     return { isPredict: true, ...doc.toResource() };
        // });

        // console.log(companies);
        // RabbitMQServer.getInstance().getApiScrapperStub().fetchCompanyNews({ companies });

        const accounts = (await TrackedTwitterAccountDocument.find({})).map((doc: ITrackedTwitterAccountModel) => doc.account);
        console.log(accounts);
        RabbitMQServer.getInstance().getApiScrapperStub().fetchTweetsByAccount({ accounts });
    }

}


export default new TesteResolver();
