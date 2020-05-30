import { IConsumer } from 'stock-learning-rabbitmq';
import { CompanyDataDocument } from './../documents/company-data-document';

export class InfomoneyIbovespaCompanyData implements IConsumer<any> {

    consumerName = 'infomoney-ibovespa-company-data';

    public async consume(message: any): Promise<void> {
        if (message.companyData && !!message.companyData.length) {
            try {
                message.companyData
                    .filter((cd: any) => !!cd && !!cd.initials)
                    .forEach(async (cd: any) => {
                        const existingDocument = await CompanyDataDocument.findOne({ initials: cd.initials });
                        if (existingDocument) {
                            existingDocument.updateWith(cd);
                            await existingDocument.updateOne(existingDocument)
                        } else {
                            CompanyDataDocument.create(cd);
                        }
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }

}

export default new InfomoneyIbovespaCompanyData();