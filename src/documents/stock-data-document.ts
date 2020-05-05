import { IStockDataModel } from './../models/stock-data-model';
import { Model, model, Schema } from 'mongoose';
import { IDocumentCommon } from './document-common';

interface IStockDataDocument extends IStockDataModel, IDocumentCommon { }

const StockDataSchema = new Schema(
    {
        name: { type: String, required: true },
        date: { type: String, required: true },
        open:  { type: String, required: false },
        close:  { type: String, required: false },
        variation:  { type: String, required: false },
        min:  { type: String, required: false },
        max:  { type: String, required: false },
        volume:  { type: String, required: false },
    },
    {
        timestamps: true
    }
)

StockDataSchema.methods.toResource = function (): IStockDataModel {
    return { ...this._doc }
}

export const StockDataDocument: Model<IStockDataDocument> = model<IStockDataDocument>('StockData', StockDataSchema, 'stock_data');
