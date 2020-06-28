import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionPercentageModel } from '../models/prediction-percentage-model';
import { IDocumentCommon } from './document-common';

interface IPredictionPercentageDocument extends IPredictionPercentageModel, IDocumentCommon {
    updateWith(data: any): void;
}

const PredictionPercentageSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        porcentage: { type: SchemaTypes.Number, required: true },
        isSell: { type: SchemaTypes.Boolean, required: true },
    },
    {
        timestamps: true
    }
)

PredictionPercentageSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

PredictionPercentageSchema.methods.toResource = function (): IPredictionPercentageModel {
    return { ...this._doc }
}

export const PredictionPercentageDocument: Model<IPredictionPercentageDocument> = model<IPredictionPercentageDocument>(
    'PredictionPercentage',
    PredictionPercentageSchema,
    'prediction_percentage'
);
