import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ICompanyDataModel } from './../models/company-data-model';
import { IDocumentCommon } from './document-common';

interface ICompanyDataDocument extends ICompanyDataModel, IDocumentCommon { }

const CompanyDataSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        infomoneyUrl: { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String, required: false },
        type: { type: SchemaTypes.String, required: false },
        sector: { type: SchemaTypes.String, required: false },
        description: { type: SchemaTypes.String, required: false },
    },
    {
        timestamps: true
    }
)

CompanyDataSchema.methods.toResource = function (): ICompanyDataModel {
    return { ...this._doc }
}

CompanyDataSchema.methods.getFullInfomoneyUrl = function (): string {
    const informoneyUrl = this._doc.infomoneyUrl;
    return `https://www.infomoney.com.br/cotacoes/${informoneyUrl}`;
}

export const CompanyDataDocument: Model<ICompanyDataDocument> = model<ICompanyDataDocument>(
    'CompanyData',
    CompanyDataSchema,
    'company_data'
);
