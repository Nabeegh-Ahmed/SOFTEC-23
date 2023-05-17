import Z, { object, string, TypeOf, nativeEnum, ZodEnum } from "zod";
import { AccountGender } from "../../../types/enums";

export const genders: string[] = Object.keys(AccountGender) as string[];


export const registerFormSchema = object({
  name: string().min(2, "Name must be at least 2 characters long"),
  email: string().min(1, "Email is required").email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
  passwordConfirm: string()
    .min(1, "Please confirm your password"),
  gender: Z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Sorry, the passwords do not match!",
});

export type RegisterFormType = TypeOf<typeof registerFormSchema>;
