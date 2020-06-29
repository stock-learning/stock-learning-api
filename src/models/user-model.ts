import { INotificationModel } from './notification-model';
export interface IUserModel {
    name: string;
    email: string;
    password: string;
    followedCompanyInitials?: string[];
    notifications?: INotificationModel[];
}