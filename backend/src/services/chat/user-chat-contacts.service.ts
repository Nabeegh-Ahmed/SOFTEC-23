import { UserChatContacts } from "../../models/chat";
import { BaseService } from "../base.service";

export class UserChatContactsService extends BaseService<UserChatContacts> {
    constructor(
        excludedFields: (keyof UserChatContacts)[] = []
    ) {
        super(UserChatContacts, excludedFields);
    }
}