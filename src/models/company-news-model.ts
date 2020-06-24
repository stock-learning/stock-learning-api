import { INewsSourceModel } from './news-source-model';

export interface ICompanyNewsModel {
    initials: string;
    source: INewsSourceModel;
    author?: string;
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: Date;
    content?: string;
}
