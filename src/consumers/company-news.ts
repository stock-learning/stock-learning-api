import moment from 'moment';
import { IConsumer } from 'stock-learning-rabbitmq';
import { CompanyNewsDocument } from './../documents/company-news-document';
import { ICompanyNewsModel } from './../models/company-news-model';

export class CompanyNews implements IConsumer<any> {

    consumerName = 'company-news';

    public async consume(message: any): Promise<void> {
        if (message.companyNews?.length) {
            message.companyNews.forEach((rawData: any) => {
                console.log(JSON.stringify(rawData));
            })
            const models: ICompanyNewsModel[] = message.companyNews
                    .filter((rawData: any) => !!rawData && !!rawData.companyInitials)
                    .map((rawData: any) => this.toCompanyNewsModel(rawData));
            console.log(JSON.stringify(models));
            const newModels: ICompanyNewsModel[] = models.filter(async (model: ICompanyNewsModel) => {
                return !(await CompanyNewsDocument.exists({ companyInitials: model.companyInitials, publishedAt: model.publishedAt }));
            });
            // console.log(JSON.stringify(newModels));
            await CompanyNewsDocument.insertMany(newModels);
        }
    }

    private toCompanyNewsModel(rawData: any): ICompanyNewsModel {
        return {
            companyInitials: rawData.companyInitials,
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