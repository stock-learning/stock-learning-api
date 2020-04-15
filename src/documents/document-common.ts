import { Document } from 'mongoose';

export interface IDocumentCommon extends Document {
    toResource(): any;
}
