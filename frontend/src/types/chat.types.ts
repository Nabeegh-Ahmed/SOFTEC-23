import { User } from "./user.types";

export interface ChatMessage {
    _id: string;
    message: string;
    createdAt: string;

    sender?: User
    receiver?: User
}


export interface ChatContact {
    _id: string;
    user: User;
    online: Boolean;
    lastMessage?: ChatMessage;
    read: Boolean;
}


export interface Conversation {
    _id: string;
    messages: ChatMessage[];
}