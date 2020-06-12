import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { IPredictionMovementModel } from '../models/prediction-movement-model';
import { IDocumentCommon } from './document-common';

interface IPredictionMovementDocument extends IPredictionMovementModel, IDocumentCommon {
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

PredictionMovementSchema.methods.toResource = function (): IPredictionMovementModel {
    return { ...this._doc }
}

export const PredictionMovementDocument: Model<IPredictionMovementDocument> = model<IPredictionMovementDocument>(
    'PredictionMovement',
    PredictionMovementSchema,
    'prediction_movement'
);
