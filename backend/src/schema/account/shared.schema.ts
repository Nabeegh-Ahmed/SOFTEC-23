import Z from "zod";
import { AccountProvider, AccountStatus, Gender } from '../../types/enums'
import { accountConfig } from "../../models/accounts";
import { filterSchema, getManySchema } from "../shared.schema";


export const accountSchema = Z.object({
    name: Z.string({
        required_error: "First name is required",
    }).min(accountConfig.account.name.min, {
        message: `First name must be at least ${accountConfig.account.name.min} characters long`,
    }).max(accountConfig.account.name.max, {
        message: `First name must be at most ${accountConfig.account.name.max} characters long`,
    }),
    photo: Z.string().url().optional(),
    email: Z.string({
        required_error: "Email is required",
    }).email("Email is invalid"),
    password: Z.string().regex(accountConfig.account.password.regex, {
        message: "Password must be 8 characters long and must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }),
    // provider: Z.nativeEnum(AccountProvider).default(accountConfig.account.provider.default),
})

export const accountSignupSchema = Z.object({
    body: accountSchema.pick({
        email: true,
        password: true,
        name: true,
    })
})


export const accountLoginSchema = Z.object({
    body: accountSchema.pick({
        email: true,
        password: true,
    })
})


export const accountGoogleLoginSchema = Z.object({
    body: Z.object({
        code: Z.string(),
        state: Z.string().url().optional().default("/"),
    })
})


// emailVerificationCode is not nullable
export const accountVerifyEmailSchema = Z.object({
    params: Z.object({
        emailVerificationCode: Z.string(),
    })
})


export const accountForgetPasswordSchema = Z.object({
    body: accountSchema.pick({
        email: true,
    })
})

export const accountResetPasswordSchema = Z.object({
    params: Z.object({
        code: Z.string(),
    }),
    body: accountSchema.pick({
        password: true,
    })
})

export const accountFilterSchema = filterSchema.extend({
    status: Z.nativeEnum(AccountStatus).optional(),
});

export const accountGetManySchema = getManySchema(accountFilterSchema);

export type AccountSchema = Z.infer<typeof accountSchema>
export type AccountSignupSchema = Z.infer<typeof accountSignupSchema>
export type AccountLoginSchema = Z.infer<typeof accountLoginSchema>
export type AccountVerifyEmailSchema = Z.infer<typeof accountVerifyEmailSchema>
export type AccountForgetPasswordSchema = Z.infer<typeof accountForgetPasswordSchema>
export type AccountResetPasswordSchema = Z.infer<typeof accountResetPasswordSchema>
export type AccountGoogleLoginSchema = Z.infer<typeof accountGoogleLoginSchema>
export type AccountFilterSchema = Z.infer<typeof accountFilterSchema>
export type AccountGetManySchema = Z.infer<typeof accountGetManySchema>