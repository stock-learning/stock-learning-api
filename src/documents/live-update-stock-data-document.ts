import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ILiveUpdateStockDataModel } from '../models/live-update-stock-data-model';
import { IDocumentCommon } from './document-common';

interface ILiveUpdateStockDataDocument extends ILiveUpdateStockDataModel, IDocumentCommon { }

const LiveUpdateStockDataSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        fetchTime: { type: SchemaTypes.Date, required: true },
        open: { type: SchemaTypes.Decimal128, required: false },
        business: { type: SchemaTypes.Decimal128, required: false },
        quantity: { type: SchemaTypes.Decimal128, required: false },
        volume: { type: SchemaTypes.Number, required: false },
        variation: { type: SchemaTypes.Decimal128, required: false },
        min: { type: SchemaTypes.Decimal128, required: false },
        max: { type: SchemaTypes.Decimal128, required: false },
        variationDay: { type: SchemaTypes.Decimal128, required: false },
        variationMonth: { type: SchemaTypes.Decimal128, required: false },
        variationYear: { type: SchemaTypes.Decimal128, required: false },
        variation52weeks: { type: SchemaTypes.Decimal128, required: false },
    },
    {
        timestamps: true
    }
)

LiveUpdateStockDataSchema.methods.toResource = function (): ILiveUpdateStockDataModel {
    return { ...this._doc }
}

export const LiveUpdateStockDataDocument: Model<ILiveUpdateStockDataDocument> = model<ILiveUpdateStockDataDocument>(
    'LiveUpdateStockData',
    LiveUpdateStockDataSchema,
    'live_update_stock_data'
);

