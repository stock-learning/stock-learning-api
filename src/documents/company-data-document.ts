import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ICompanyDataModel } from './../models/company-data-model';
import { IDocumentCommon } from './document-common';

interface ICompanyDataDocument extends ICompanyDataModel, IDocumentCommon {
    updateWith(data: any): void;
}

const CompanyDataSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String, required: false },
        logoUrl: { type: SchemaTypes.String, required: false },
        type: { type: SchemaTypes.String, required: false },
        sector: { type: SchemaTypes.String, required: false },
        description: { type: SchemaTypes.String, required: false },
    },
    {
        timestamps: true
    }
)

CompanyDataSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

CompanyDataSchema.methods.toResource = function (): ICompanyDataModel {
    return { ...this._doc }
}

export const CompanyDataDocument: Model<ICompanyDataDocument> = model<ICompanyDataDocument>(
    'CompanyData',
    CompanyDataSchema,
    'company_data'
);
