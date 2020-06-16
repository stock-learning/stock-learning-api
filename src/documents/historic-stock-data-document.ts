import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { IHistoricStockDataModel } from '../models/historic-stock-data-model';
import { IDocumentCommon } from './document-common';

interface IHistoricStockDataDocument extends IHistoricStockDataModel, IDocumentCommon { }

const HistoricStockDataSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        date: { type: SchemaTypes.Date, required: true },
        open: { type: SchemaTypes.Number, required: false },
        close: { type: SchemaTypes.Number, required: false },
        variation: { type: SchemaTypes.Number, required: false },
        min: { type: SchemaTypes.Number, required: false },
        max: { type: SchemaTypes.Number, required: false },
        volume: { type: SchemaTypes.Number, required: false },
    },
    {
        timestamps: true
    }
)

HistoricStockDataSchema.methods.toResource = function (): IHistoricStockDataModel {
    return { ...this._doc }
}

export const HistoricStockDataDocument: Model<IHistoricStockDataDocument> = model<IHistoricStockDataDocument>(
    'HistoricStockData',
    HistoricStockDataSchema,
    'historic_stock_data'
);
