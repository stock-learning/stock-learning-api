import moment from 'moment';
import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { CurrentUserNotificationOutputModel } from './../../models/current-user-notification-output-model';

class CurrentUserNotificationResolver implements IResolver<any, CurrentUserNotificationOutputModel[]> {

    public readonly resolverName = 'currentUserNotification';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<CurrentUserNotificationOutputModel[]> {
        return [{
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        },
        {
            dateTime: moment().toDate(),
            text: 'Notificação',
        }];
    }
}


export default new CurrentUserNotificationResolver();
