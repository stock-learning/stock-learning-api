import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IHistoricStockDataModel } from '../models/historic-stock-data-model';

export interface IHistoricStockDataDocument extends IHistoricStockDataModel, Document {
    updateWith(data: any): void;
    toResource(): IHistoricStockDataResource;
}

export interface IHistoricStockDataResource extends IHistoricStockDataModel{
    id: string;
}

const HistoricStockDataSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        date: { type: SchemaTypes.Date, required: true },
        open: { type: SchemaTypes.Number, required: true, default: 0 },
        close: { type: SchemaTypes.Number, required: true, default: 0 },
        variation: { type: SchemaTypes.Number, required: true, default: 0 },
        min: { type: SchemaTypes.Number, required: true, default: 0 },
        max: { type: SchemaTypes.Number, required: true, default: 0 },
        volume: { type: SchemaTypes.Number, required: true, default: 0 },
        adjClose: { type: SchemaTypes.Number, required: true, default: 0 },
    },
    {
        timestamps: true
    }
)

HistoricStockDataSchema.methods.toResource = function (): IHistoricStockDataModel {
    return { ...this._doc }
}

HistoricStockDataSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const HistoricStockDataDocument: Model<IHistoricStockDataDocument> = model<IHistoricStockDataDocument>(
    'HistoricStockData',
    HistoricStockDataSchema,
    'historic_stock_data'
);
