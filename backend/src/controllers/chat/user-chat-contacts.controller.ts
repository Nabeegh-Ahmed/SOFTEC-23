import { UserChatContacts } from "../../models/chat";
import { UserChatContactsService } from "../../services/chat";
import { BaseController } from "../base.controller";

export class UserChatContactsController extends BaseController<UserChatContacts>{
    static excludedFields: (keyof UserChatContacts)[] = [];

    constructor(service: UserChatContactsService = new UserChatContactsService()) {
        super(service, UserChatContactsController.excludedFields);
    }
}