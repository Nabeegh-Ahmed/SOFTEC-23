import * as Z from "zod";
import { userConfig } from "../models";

// format: +xxx-xxxxxxxxxx
export const phoneNumberSchema = Z.string().regex(userConfig.user.phoneNumber.regex);

export const otpSchema = Z.string().regex(/^\d{6}$/);


export type PhoneNumberSchema = Z.infer<typeof phoneNumberSchema>
export type OtpSchema = Z.infer<typeof otpSchema>