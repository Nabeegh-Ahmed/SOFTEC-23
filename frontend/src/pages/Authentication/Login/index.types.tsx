import { string, object, TypeOf } from "zod";

export const loginFormSchema = object({
  email: string().min(1, "Email is required").email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
});

export type LoginFormType = TypeOf<typeof loginFormSchema>;