import { Request, Response } from 'express';
import moment from 'moment';
import { Authentication } from "../../common/decorators/authentication";
import { IResolver } from '../../common/graphql/iresolver';
import { LiveUpdateStockDataDocument } from './../../documents/live-update-stock-data-document';

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

        const data2 = moment().subtract(3, 'weeks').toDate();

        const dailyRecords2 = (await LiveUpdateStockDataDocument.find({
            fetchTime : { $gt : data2 }
        })).map(doc => doc.toResource());

        console.log(dailyRecords2);
        console.log(data2);
    }

}


export default new TesteResolver();
