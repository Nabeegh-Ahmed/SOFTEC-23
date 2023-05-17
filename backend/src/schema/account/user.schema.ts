import Z from "zod";
import { phoneNumberSchema, otpSchema } from '../phone-number.schema'
import { idNumberSchema } from '../identity-card.schema'
import { accountFilterSchema, accountSchema } from "./shared.schema";
import { getManySchema, getOneByIdSchema, paramsSchema } from "../shared.schema";
import { contractFilterSchema } from "../contract";
import { accountConfig } from "../../models/accounts";
import { Gender } from "../../types";

export const userSchema = accountSchema.extend({
  email: Z.string({
    required_error: "Email is required",
  }).email("Email is invalid"),
  password: Z.string().regex(accountConfig.account.password.regex, {
    message: "Password must be 8 characters long and must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
  }),
  dob: Z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: Z.nativeEnum(Gender)
})

export const userSignupSchema = Z.object({
  body: userSchema.pick({
    email: true,
    password: true,
    name: true,
    dob: true,
    gender: true
  })
})

export const userPhoneNumberAddSchema = Z.object({
  body: Z.object({
    phoneNumber: phoneNumberSchema,
  })
})


export const userOTPSchema = Z.object({
  otp: otpSchema,
})


export const userVerifyPhoneNumberSchema = Z.object({
  body: userOTPSchema
})

export const userUpdateIdentitySchema = Z.object({
  body: Z.object({
    // idPhotoUrl: Z.string().url(),
    // idNumber: idNumberSchema,
    // faceWithIdPhotoUrl: Z.string().url(),
  })
});

export const userVerifyIdentitySchema = Z.object({
  params: paramsSchema,
});

export const userFilterSchema = accountFilterSchema.extend({
  dob: Z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: Z.nativeEnum(Gender)
  // isPhoneNumberVerified: Z.boolean().optional(),
  // isEmailVerified: Z.boolean().optional(),
  // isIdNumberVerified: Z.boolean().optional(),
  // isFaceWithIdPhotoVerified: Z.boolean().optional(),
});

export const userGetOneByIdSchema = getOneByIdSchema(userFilterSchema);


export const userGetManySchema = getManySchema(userFilterSchema);

export const userContractFilterSchema = contractFilterSchema.omit({
  contractee: true,
})

export const userGetManyContractsSchema = Z.object({
  params: paramsSchema,
  ...getManySchema(userContractFilterSchema).shape
})

export const userGetOneContractByIdSchema = getOneByIdSchema(userContractFilterSchema);

export type UserSchema = Z.infer<typeof userSchema>
export type UserGetOneByIdSchema = Z.infer<typeof userGetOneByIdSchema>
export type UserOTPSchema = Z.infer<typeof userOTPSchema>
export type UserVerifyPhoneNumberSchema = Z.infer<typeof userVerifyPhoneNumberSchema>
export type UserUpdateIdentitySchema = Z.infer<typeof userUpdateIdentitySchema>
export type UserVerifyIdentitySchema = Z.infer<typeof userVerifyIdentitySchema>
export type UserFilterSchema = Z.infer<typeof userFilterSchema>
export type UserGetManySchema = Z.infer<typeof userGetManySchema>
export type UserContractFilterSchema = Z.infer<typeof userContractFilterSchema>
export type UserGetManyContractsSchema = Z.infer<typeof userGetManyContractsSchema>
export type UserGetOneContractByIdSchema = Z.infer<typeof userGetOneContractByIdSchema>
export type UserPhoneNumberAddSchema = Z.infer<typeof userPhoneNumberAddSchema>
export type UserSignupSchema = Z.infer<typeof userSignupSchema>