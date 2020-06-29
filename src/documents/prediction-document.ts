import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionModel } from '../models/prediction-model';

interface IPredictionDocument extends IPredictionModel, Document {
    updateWith(data: any): void;
}

const PredictionSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        averageHit: { type: SchemaTypes.String, required: false },
        totalReturn: { type: SchemaTypes.Number, required: false },
        buyHold: { type: SchemaTypes.Number, required: false },
        updateDate: { type: SchemaTypes.Date, required: true },
    },
    {
        timestamps: true
    }
)

PredictionSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const PredictionDocument: Model<IPredictionDocument> = model<IPredictionDocument>(
    'Prediction',
    PredictionSchema,
    'prediction'
);
