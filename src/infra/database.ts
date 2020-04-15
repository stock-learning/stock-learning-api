import { connect, Mongoose } from 'mongoose';

class Database {
  private _mongoose: Mongoose | undefined;

  public async connect(): Promise<Mongoose> {
    if (this._mongoose) {
      return new Promise(() => this._mongoose);
    } else {
      this._mongoose = await connect(process.env.DB_CONNECTION_STRING || '');
      return this._mongoose;
    }
  }
}

export default new Database();
