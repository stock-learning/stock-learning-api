import { TrackedTwitterAccountDocument } from './../documents/tracked-twitter-account-document';
import { ITrackedTwitterAccountModel } from './../models/tracked-twitter-account-model';


export class TrackedTwitterAccountController {

    public async fetchAllTrackedTwitterAccounts(): Promise<string[]> {
        return (await TrackedTwitterAccountDocument.find({})).map((doc: ITrackedTwitterAccountModel) => doc.account)
    }

}

export default new TrackedTwitterAccountController();
