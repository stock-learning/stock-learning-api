import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionModel } from '../models/prediction-model';
import { IDocumentCommon } from './document-common';

interface IPredictionDocument extends IPredictionModel, IDocumentCommon {
    updateWith(data: any): void;
}

const PredictionSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        averageHit: { type: SchemaTypes.String, required: false },
        totalReturn: { type: SchemaTypes.Decimal128, required: false },
        buyHold: { type: SchemaTypes.Decimal128, required: false },
        updateDate: { type: SchemaTypes.Date, required: true },
    },
    {
        timestamps: true
    }
)

PredictionSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

PredictionSchema.methods.toResource = function (): IPredictionModel {
    return { ...this._doc }
}

export const PredictionDocument: Model<IPredictionDocument> = model<IPredictionDocument>(
    'Prediction',
    PredictionSchema,
    'prediction'
);
