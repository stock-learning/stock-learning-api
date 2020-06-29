import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { ILiveUpdateStockDataModel } from '../models/live-update-stock-data-model';

export interface ILiveUpdateStockDataDocument extends ILiveUpdateStockDataModel, Document {
    toResource(): ILiveUpdateStockDataResource;
}

export interface ILiveUpdateStockDataResource extends ILiveUpdateStockDataModel {
    id: string;
}

const LiveUpdateStockDataSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        fetchTime: { type: SchemaTypes.Date, required: true },
        value: { type: SchemaTypes.Number, required: false },
        close: { type: SchemaTypes.Number, required: false },
        open: { type: SchemaTypes.Number, required: false },
        business: { type: SchemaTypes.Number, required: false },
        quantity: { type: SchemaTypes.Number, required: false },
        volume: { type: SchemaTypes.Number, required: false },
        variation: { type: SchemaTypes.Number, required: false },
        min: { type: SchemaTypes.Number, required: false },
        max: { type: SchemaTypes.Number, required: false },
        variationDay: { type: SchemaTypes.Number, required: false },
        variationMonth: { type: SchemaTypes.Number, required: false },
        variationYear: { type: SchemaTypes.Number, required: false },
        variation52weeks: { type: SchemaTypes.Number, required: false },
    },
    {
        timestamps: true
    }
)

LiveUpdateStockDataSchema.methods.toResource = function (): ILiveUpdateStockDataResource {
    return { id: this._id.toString(), ...this._doc }
}

export const LiveUpdateStockDataDocument: Model<ILiveUpdateStockDataDocument> = model<ILiveUpdateStockDataDocument>(
    'LiveUpdateStockData',
    LiveUpdateStockDataSchema,
    'live_update_stock_data'
);