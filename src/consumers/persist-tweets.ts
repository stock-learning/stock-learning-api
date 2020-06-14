import { IConsumer } from 'stock-learning-rabbitmq';
import { CompanyDataDocument } from './../documents/company-data-document';
import { TweetDocument } from './../documents/tweet-document';
import { ICompanyDataModel } from './../models/company-data-model';
import { ITweetModel } from './../models/tweet-model';

export class PersistTweets implements IConsumer<any> {

    consumerName = 'persist-tweets';

    public async consume(message: any): Promise<void> {
        if (message.tweets?.length) {
            const companyData: ICompanyDataModel[] = await CompanyDataDocument.find({});
            const toPersist = (await Promise.all(message.tweets.map(async (rawData: any): Promise<ITweetModel | undefined> => {
                if (!rawData.account || !rawData.statusId || (await TweetDocument.exists({ account: rawData.account, statusId: rawData.statusId }))) {
                    return undefined;
                }

                const relatedInitials = companyData
                    .filter((companyDataModel: ICompanyDataModel) => (rawData.cleanText || '').includes(companyDataModel.name))
                    .map((companyDataModel: ICompanyDataModel) => companyDataModel.initials);

                return { ...rawData, relatedInitials };
            }))).filter((model: any) => !!model);
            try {
                await TweetDocument.insertMany(toPersist);
            } catch (e) {
                console.error(e);
            }
        }
    }

}

export default new PersistTweets();