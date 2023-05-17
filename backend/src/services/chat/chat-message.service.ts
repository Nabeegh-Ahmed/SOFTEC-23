import { ChatMessage } from "../../models/chat";
import { BaseService } from "../base.service";

export class ChatMessageService extends BaseService<ChatMessage> {
    constructor(
        excludedFields: (keyof ChatMessage)[] = []
    ) {
        super(ChatMessage, excludedFields);
    }
}