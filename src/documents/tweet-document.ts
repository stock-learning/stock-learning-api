import { Model, model, Schema, SchemaTypes } from 'mongoose';
import { ITweetModel } from '../models/tweet-model';
import { IDocumentCommon } from './document-common';

interface ITweetDocument extends ITweetModel, IDocumentCommon {
    getStatusLink(): string;
    updateWith(data: any): void;
}

const TweetSchema = new Schema(
    {
        account: { type: SchemaTypes.String, required: true },
        tweet: { type: SchemaTypes.String, required: true },
        cleanText: { type: SchemaTypes.String, required: false },
        createdAt: { type: SchemaTypes.Date, required: true },
        statusId: { type: SchemaTypes.String, required: true },
        sentiment: { type: SchemaTypes.String, enum: [ 'POSITIVE', 'NEGATIVE', 'NEUTRAL', 'MIXED' ], required: false },
        relatedInitials: [{ type: SchemaTypes.String, required: true }],
    },
    {
        timestamps: true
    }
)

TweetSchema.methods.getStatusLink = function(): string {
    return `https://twitter.com/${ this._doc.account }/status/${ this._doc.statusId }`;
}

TweetSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

TweetSchema.methods.toResource = function (): ITweetModel {
    return { ...this._doc }
}

export const TweetDocument: Model<ITweetDocument> = model<ITweetDocument>(
    'Tweet',
    TweetSchema,
    'tweet'
);
