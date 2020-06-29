import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionMovementModel } from '../models/prediction-movement-model';

interface IPredictionMovementDocument extends IPredictionMovementModel, Document {
    updateWith(data: any): void;
}

const PredictionMovementSchema = new Schema(
    {
        initials: { type: SchemaTypes.String, required: true },
        isSell: { type: SchemaTypes.Boolean, required: true },
    },
    {
        timestamps: true
    }
)

PredictionMovementSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const PredictionMovementDocument: Model<IPredictionMovementDocument> = model<IPredictionMovementDocument>(
    'PredictionMovement',
    PredictionMovementSchema,
    'prediction_movement'
);
