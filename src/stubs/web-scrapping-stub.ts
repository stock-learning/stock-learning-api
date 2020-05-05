import rabbitmq from '../infra/rabbitmq';

export class WebScrappingStub {

    public syncInfomoneyIbvespa(): boolean {
        return rabbitmq.sendMessage(process.env.SCRAPPING_QUEUE_NAME || '', 'sync-infomoney-ibovespa',  {});
    }

    public fetchInfomoneyIbovespaHistoricData() {
        return rabbitmq.sendMessage(process.env.SCRAPPING_QUEUE_NAME || '', 'fetch-infomoney-ibovespa-historic-data',  {});
    }

}

const singleton = new WebScrappingStub();
export default function webScrappingStub() : WebScrappingStub { return singleton; };
