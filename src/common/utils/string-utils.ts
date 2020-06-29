import { ObjectId } from 'mongodb';


export const toObjectId = (value: any): ObjectId => {
    if (!value || value instanceof ObjectId) {
        return value
    } else {
        return new ObjectId(value)
    }
}
