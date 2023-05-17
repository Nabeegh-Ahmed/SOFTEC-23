import { ChatContact, ChatMessage, Conversation } from "../../../../types";



export interface ChatCardPorps {
    contact: ChatContact;
    onClick: (contact: ChatContact) => void;
}


export interface MessagesContainerProps {
    conversation: Conversation,
    contact: ChatContact
}

export interface MessageProps {
    message: ChatMessage;
    sent: Boolean;
}