import { Ref, Severity, index, modelOptions, prop } from "@typegoose/typegoose";
import { IBaseModel, User } from "..";
import { AccountRole } from "../../types";


@index({ resetPasswordTokenHash: 1, emailVerificationTokenHash: 1, account: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class AccountExtension extends IBaseModel {
    // account id
    @prop({
        ref: () => User,
        required: true,
        unique: true,
    })
    account!: Ref<User>;

    // role 
    @prop({
        required: true,
    })
    role!: AccountRole;

    @prop({
        type: String,
        required: false,
        select: false,
    })
    resetPasswordTokenHash?: string;

    @prop({
        type: Date,
        required: false,
    })
    resetPasswordTokenExpiry?: Date;

    @prop({
        type: String,
        required: false,
        select: false,
    })
    emailVerificationTokenHash?: string;

    @prop({
        type: Date,
        required: false,
    })
    emailVerificationTokenExpiry?: Date;
}
