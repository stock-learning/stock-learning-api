import moment from 'moment';
import { CompanyDataDocument } from './../documents/company-data-document';
import { CompanyNewsDocument } from './../documents/company-news-document';
import { CompanyNewsRequestDataModel } from './../models/company-news-request-data-model';


export class CompanyDataController {

    public async fetchAllCompanyInitials(): Promise<string[]> {
        return (await CompanyDataDocument.find({}).select({ initials: 1, _id: 0 })).map(cd => cd.initials);
    }

    public async fetchCompanyNewsRequestData(): Promise<CompanyNewsRequestDataModel[]> {
        const toReturn = (await Promise.all((await CompanyDataDocument.find({}).select({ initials: 1, name: 1, sector: 1, _id: 0 }))
            .map(async cd => {
                const result = await CompanyNewsDocument.findOne({ companyInitials: '' })
                    .sort({ publishedAt: -1 })
                    .select({ _id: 0, publishedAt: 1 });
                return {
                    query: `${cd.name || cd.initials} ${cd.sector || ''}`,
                    initials: cd.initials,
                    startDate: (result && result.publishedAt && moment(result.publishedAt).format('yyyy-MM-DD')) || undefined,
                    endDate: moment().format('yyyy-MM-DD')
                };
            })))
            .filter(i => !!i);
        console.log(toReturn);
        return toReturn;
    }

}

export default new CompanyDataController();
