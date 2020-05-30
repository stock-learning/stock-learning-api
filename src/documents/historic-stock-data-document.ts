import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { IHistoricStockDataModel } from '../models/historic-stock-data-model';
import { IDocumentCommon } from './document-common';

interface IHistoricStockDataDocument extends IHistoricStockDataModel, IDocumentCommon { }

const HistoricStockDataSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        date: { type: SchemaTypes.Date, required: true },
        open: { type: SchemaTypes.Decimal128, required: false },
        close: { type: SchemaTypes.Decimal128, required: false },
        variation: { type: SchemaTypes.Decimal128, required: false },
        min: { type: SchemaTypes.Decimal128, required: false },
        max: { type: SchemaTypes.Decimal128, required: false },
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