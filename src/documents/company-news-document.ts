import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ICompanyNewsModel } from './../models/company-news-model';
import { IDocumentCommon } from './document-common';

interface ICompanyNewsDocument extends ICompanyNewsModel, IDocumentCommon {
}


const CompanyNewsSchema = new Schema(
    {
        companyInitials: { type: SchemaTypes.String, required: true },
        source: {
            id: { type: SchemaTypes.String, required: false },
            name: { type: SchemaTypes.String, required: false },
        },
        author: { type: SchemaTypes.String, required: false },
        title: { type: SchemaTypes.String, required: false },
        description: { type: SchemaTypes.String, required: false },
        url: { type: SchemaTypes.String, required: false },
        urlToImage: { type: SchemaTypes.String, required: false },
        publishedAt: { type: SchemaTypes.Date, required: false },
        content: { type: SchemaTypes.String, required: false },
        sentiment: { type: SchemaTypes.String, enum: [ 'POSITIVE', 'NEGATIVE', 'NEUTRAL' ], required: false }
    },
    {
        timestamps: true
    }
)

CompanyNewsSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

CompanyNewsSchema.methods.toResource = function (): ICompanyNewsModel {
    return { ...this._doc }
}

export const CompanyNewsDocument: Model<ICompanyNewsDocument> = model<ICompanyNewsDocument>(
    'CompanyNews',
    CompanyNewsSchema,
    'company_news'
);
