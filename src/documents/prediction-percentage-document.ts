import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionPercentageModel } from '../models/prediction-percentage-model';

export interface IPredictionPercentageDocument extends IPredictionPercentageModel, Document {
    updateWith(data: any): void;
}

const PredictionPercentageSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        porcentage: { type: SchemaTypes.Number, required: true },
        isPositive: { type: SchemaTypes.Boolean, required: true },
    },
    {
        timestamps: true
    }
)

PredictionPercentageSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const PredictionPercentageDocument: Model<IPredictionPercentageDocument> = model<IPredictionPercentageDocument>(
    'PredictionPercentage',
    PredictionPercentageSchema,
    'prediction_percentage'
);
