import { IResolver } from '../../common/graphql/iresolver';
import { GraphQLContext } from './../../common/graphql/graphql-context';
import { toObjectId } from './../../common/utils/string-utils';
import { UserDocument } from './../../documents/user-document';
import { CurrentUserNotificationOutputModel } from './../../models/current-user-notification-output-model';

class CurrentUserNotificationResolver implements IResolver<any, CurrentUserNotificationOutputModel[]> {

    public readonly resolverName = 'currentUserNotification';

    public async resolve(parent: any, args: any, context: GraphQLContext): Promise<CurrentUserNotificationOutputModel[]> {
        const userId = toObjectId(context.request.userId);
        const result = await UserDocument.findOne({ _id: userId });
        return result?.notifications || [];
    }
}


export default new CurrentUserNotificationResolver();
