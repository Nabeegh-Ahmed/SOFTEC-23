import { ChatMessage } from "../../models/chat";
import { ChatMessageService } from "../../services/chat";
import { BaseController } from "../base.controller";

export class ChatMessageController extends BaseController<ChatMessage>{
    static excludedFields: (keyof ChatMessage)[] = [];

    constructor(service: ChatMessageService = new ChatMessageService()) {
        super(service, ChatMessageController.excludedFields);
    }
}