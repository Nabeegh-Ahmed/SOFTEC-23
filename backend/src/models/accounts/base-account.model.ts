import bcrypt, { genSaltSync } from "bcryptjs";

import { IBaseModel } from '../base.model';
import { Severity, modelOptions, pre, prop } from '@typegoose/typegoose';
import { AccountProvider, AccountRole, AccountStatus } from '../../types/enums';
import { randomString } from "../../utils";
import { randomInt } from "crypto";
import config from "config";
import { FavoriteProducts } from "../favorite-products.model";

export const salt = genSaltSync(config.get<number>("saltRounds"));

export const accountConfig = {
    account: {
        name: {
            min: 2,
            max: 50,
        },
        role: {
            default: AccountRole.USER
        },
        status: {
            default: AccountStatus.ACTIVE
        },
        password: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/
        },
        passwordSalt: {
            default: randomString(randomInt(5, 10)),
        },
        isEmailVerified: {
            default: false
        },
        provider: {
            default: AccountProvider.LOCAL
        }
    }
}


@pre<IAccount>("save", async function (next) {
    // Hash password if the password is new or was updated
    if (!this.isModified("password")) return;

    this.password = await IAccount.hashPassword(this.password, this.passwordSalt);
    next();
})
@pre<IAccount>("findOneAndUpdate", async function (next) {
    const _update = this.getUpdate() as IAccount

    // Hash password if the password is new or was updated
    if (!_update.password) return;

    _update.password = await IAccount.hashPassword(_update.password, _update.passwordSalt);

    this.setUpdate(_update);

    next();
})

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export abstract class IAccount extends IBaseModel {

    @prop({
        required: true,
        minlength: accountConfig.account.name.min,
        maxlength: accountConfig.account.name.max,
    })
    name: string;

    @prop({ required: false })
    photo?: string;

    @prop({ unique: true, required: true })
    email: string;

    @prop({ default: accountConfig.account.isEmailVerified.default })
    isEmailVerified: boolean;

    @prop({
        default: accountConfig.account.role.default,
    })
    role!: AccountRole

    @prop({
        default: accountConfig.account.status.default
    })
    public status!: AccountStatus

    @prop({
        required: true,
        validate: {
            validator: (password: string) => accountConfig.account.password.regex.test(password),
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }
    })
    password: string;

    @prop({ default: accountConfig.account.passwordSalt.default })
    passwordSalt: string = accountConfig.account.passwordSalt.default;

    // Instance method to check if passwords match
    public async comparePasswords(plainPassword: string) {
        return await bcrypt.compare(plainPassword + this.passwordSalt, this.password);
    }

    static async hashPassword(password: string, passwordSalt: string) {
        return await bcrypt.hash(password + passwordSalt, salt);
    }
}
