import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { ITrackedTwitterAccountModel } from '../models/tracked-twitter-account-model';

interface TrackedTwitterAccountDocument extends ITrackedTwitterAccountModel, Document {
    updateWith(data: any): void;
}

const TrackedTwitterAccountSchema = new Schema(
    {
        account: { type: SchemaTypes.String, required: true },
    },
    {
        timestamps: true
    }
)


TrackedTwitterAccountSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const TrackedTwitterAccountDocument: Model<TrackedTwitterAccountDocument> = model<TrackedTwitterAccountDocument>(
    'TrackedTwitterAccount',
    TrackedTwitterAccountSchema,
    'tracked_twitter_account'
);
