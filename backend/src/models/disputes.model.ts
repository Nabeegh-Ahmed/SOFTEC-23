import { User } from './accounts';
import { IBaseModel } from './base.model';
import { Ref, Severity, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class DisputeMessage extends IBaseModel {
    @prop({ required: true })
    message: string;

    @prop({ req: true, ref: () => User })
    user: Ref<User>
}

export class Dispute extends IBaseModel {
    @prop({ required: true })
    title: string;

    @prop({ ref: () => User })
    admin: Ref<User>

    @prop({ req: true, ref: () => User })
    user: Ref<User>

    @prop({ ref: () => DisputeMessage, default: [] })
    messages: Ref<DisputeMessage>[];
}
