import { IConsumer } from 'stock-learning-rabbitmq';
import { CompanyDataDocument } from './../documents/company-data-document';

export class InfomoneyIbovespaCompanyData implements IConsumer<any> {

    consumerName = 'infomoney-ibovespa-company-data';

    public async consume(message: any): Promise<void> {
        if (message.companyData && !!message.companyData.length) {
            try {
                const validData = message.companyData.filter((cd: any) => !!cd && !!cd.initials && !!cd.infomoneyUrl);
                await CompanyDataDocument.remove({})
                await CompanyDataDocument.create(validData);
            } catch(e) {
                console.log(e);
            }
        }
    }

}

export default new InfomoneyIbovespaCompanyData();