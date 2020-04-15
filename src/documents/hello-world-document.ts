import { Model, model, Schema } from 'mongoose';
import { IHelloWorldModel } from './../models/hello-world-model';
import { IDocumentCommon } from './document-common';

interface IHelloWorldDocument extends IHelloWorldModel, IDocumentCommon { }

const HelloWorldSchema = new Schema(
    {
        helloWorld: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

HelloWorldSchema.methods.toResource = function (): IHelloWorldModel {
    return { ...this._doc }
}

export const HelloWorldDocument: Model<IHelloWorldDocument> = model<IHelloWorldDocument>('HelloWorld', HelloWorldSchema);
