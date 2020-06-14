import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ITrackedTwitterAccountModel } from '../models/tracked-twitter-account-model';
import { IDocumentCommon } from './document-common';

interface TrackedTwitterAccountDocument extends ITrackedTwitterAccountModel, IDocumentCommon {
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

TrackedTwitterAccountSchema.methods.toResource = function (): ITrackedTwitterAccountModel {
    return { ...this._doc }
}

export const TrackedTwitterAccountDocument: Model<TrackedTwitterAccountDocument> = model<TrackedTwitterAccountDocument>(
    'TrackedTwitterAccount',
    TrackedTwitterAccountSchema,
    'tracked_twitter_account'
);
