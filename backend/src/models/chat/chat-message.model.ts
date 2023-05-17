import {
    DocumentType,
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
    Ref,
    Severity,
} from "@typegoose/typegoose";
import {User} from "../accounts"

import { IBaseModel } from "../base.model";

const chatMessageConfig = {
    message: {
        text: {
            min: 1,
            max: 255
        },
    }
}

@index({ sender: 1, receiver: 1 })
@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

// Export the User class to be used as TypeScript type
export class ChatMessage extends IBaseModel {
    @prop({
        required: true,
        ref: () => User
    })
    sender!: Ref<User>

    @prop({
        required: true,
        ref: () => User
    })
    receiver!: Ref<User>

    @prop({
        required: true,
        minlength: chatMessageConfig.message.text.min,
        maxlength: chatMessageConfig.message.text.max
    })
    text: string
}