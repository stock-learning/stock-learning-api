import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IUserModel } from '../models/user-model';

interface IUserDocument extends IUserModel, Document {
    updateWith(data: any): void;
}

const UserSchema = new Schema(
    {
        name: { type: SchemaTypes.String, required: true },
        email: { type: SchemaTypes.String, required: true },
        password: { type: SchemaTypes.String, required: true },
        followedCompanyInitials: [{ type: SchemaTypes.String, required: true }],
        notifications: [
            {
                text: { type: SchemaTypes.String, required: true },
                dateTime: { type: SchemaTypes.String, required: true },
            }
        ],
    },
    {
        timestamps: true
    }
)

UserSchema.methods.updateWith = function (data: any): void {
    this._doc = { ...this._doc, ...data };
}

export const UserDocument: Model<IUserDocument> = model<IUserDocument>(
    'User',
    UserSchema,
    'user'
);
