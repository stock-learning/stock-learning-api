import { Request, Response } from 'express';
import { RabbitMQServer } from 'stock-learning-rabbitmq';
import { Authentication } from "../../common/decorators/authentication";
import { IResolver } from '../../common/graphql/iresolver';

class TesteResolver implements IResolver<any, any> {

    resolverName: string = 'testeQuery';

    @Authentication()
    async resolve(input: any, request: Request, response: Response): Promise<any> {
        console.log('aqui');
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaLiveUpdate();
        // RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaHistoricData();
        RabbitMQServer.getInstance().getWebScrapperStub().infomoneyIbovespaCompanyData();
    }

}


export default new TesteResolver();
