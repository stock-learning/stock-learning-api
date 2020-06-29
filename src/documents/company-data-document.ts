import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { ICompanyDataModel } from './../models/company-data-model';

export interface ICompanyDataDocument extends ICompanyDataModel, Document {
    updateWith(data: any): void;
    toResource(): ICompanyDataResource;
}

export interface ICompanyDataResource extends ICompanyDataModel {
    id: string;
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

CompanyDataSchema.methods.toResource = function (): ICompanyDataResource {
    return { id: this._id.toString(), ...this._doc }
}

export const CompanyDataDocument: Model<ICompanyDataDocument> = model<ICompanyDataDocument>(
    'CompanyData',
    CompanyDataSchema,
    'company_data'
);
