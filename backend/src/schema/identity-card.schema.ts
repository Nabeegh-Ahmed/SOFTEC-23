import * as Z from "zod";
import { userConfig } from "../models";

// format: xxxxx-xxxxxxx-x (Pakistan)
export const idNumberSchema = Z.string().regex(userConfig.user.idNumber.regex, {
    message: "ID number is invalid",
});

export type IdNumberSchema = Z.infer<typeof idNumberSchema>;