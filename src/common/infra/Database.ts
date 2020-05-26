
import { connect, Mongoose } from 'mongoose';

export class Database {

    public static async connect(connectionString: string): Promise<Mongoose> {
        return connect(connectionString)
    }

}
