import { Request, Response } from 'express';
import { Authentication } from "../../common/decorators/authentication";
import { IResolver } from '../../common/graphql/iresolver';
import { HistoricStockDataDocument } from '../../documents/historic-stock-data-document';
import { RabbitMQServer } from 'stock-learning-rabbitmq';

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

        // const accounts = (await TrackedTwitterAccountDocument.find({})).map((doc: ITrackedTwitterAccountModel) => doc.account);
        // console.log(accounts);
        // RabbitMQServer.getInstance().getApiScrapperStub().fetchTweetsByAccount({ accounts });

        // const allRecords = (await HistoricStockDataDocument.find({})).map(doc => doc.toResource());
        // const mapper = {isPredict: 0, stocks: allRecords};
        // console.log(mapper);

        RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionClosingHandler();
    }

}


export default new TesteResolver();
