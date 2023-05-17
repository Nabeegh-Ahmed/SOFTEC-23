import { IBaseModel } from '../base.model';
import { Ref, Severity, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import { User } from '../accounts';
import { ChatMessage } from "./chat-message.model";


@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },

    // no _id field
    schemaOptions: {
        _id: false,
    },
})

export class UserContact {
    @prop({
        required: true,
        ref: () => User
    })
    contact!: Ref<User>

    @prop({
        ref: () => ChatMessage,
        required: false,
    })
    lastMessage?: Ref<ChatMessage>
}


@index({
    sender: 1,
    receiver: 1,
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class UserChatContacts extends IBaseModel {
    @prop({
        required: true,
        ref: () => User
    })
    user!: Ref<User>

    @prop({
        required: false,
        type: () => UserContact,
        default: [],
    })
    contacts?: UserContact[]
}
