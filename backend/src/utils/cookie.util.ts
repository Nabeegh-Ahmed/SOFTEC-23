import { IAppResponse } from "../types/context.type";

// Set Cookie
export const setCookie = (
    res: IAppResponse,
    cookieKey: string,
    value: boolean | number | string | object,
    maxAge: number,
) => {
    res.cookie(cookieKey, value, {
        httpOnly: true,
        maxAge: maxAge * 60 * 1000,
    });
}
