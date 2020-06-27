import moment from 'moment';
import { IConsumer } from 'stock-learning-rabbitmq';
import { CompanyNewsDocument } from './../documents/company-news-document';
import { ICompanyNewsModel } from './../models/company-news-model';

export class CompanyNews implements IConsumer<any> {

    consumerName = 'company-news';

    public async consume(message: any): Promise<void> {
        if (message.companyNews?.length) {
            const models: ICompanyNewsModel[] = message.companyNews
                    .filter((rawData: any) => !!rawData && !!rawData.initials)
                    .map((rawData: any) => this.toCompanyNewsModel(rawData));
            const newModels: ICompanyNewsModel[] = models.filter(async (model: ICompanyNewsModel) => {
                return !(await CompanyNewsDocument.exists({ initials: model.initials, publishedAt: model.publishedAt }));
            });
            await CompanyNewsDocument.insertMany(newModels);
        }
    }

    private toCompanyNewsModel(rawData: any): ICompanyNewsModel {
        return {
            initials: rawData.initials,
            source: rawData.source && {
                id: rawData.source?.id,
                name: rawData.source?.name,
            },
            author: rawData.author,
            title: rawData.title,
            description: rawData.description,
            url: rawData.url,
            urlToImage: rawData.urlToImage,
            publishedAt: moment(rawData.publishedAt).toDate(),
            content: rawData.content,
        };
    }

}

export default new CompanyNews();