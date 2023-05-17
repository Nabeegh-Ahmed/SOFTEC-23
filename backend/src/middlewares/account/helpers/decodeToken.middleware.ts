import AppError from "../../../utils/error.util";
import { verifyOrGenerateAccessTokenIfExpired } from "../../../utils/jwt.util";
import { setCookie } from "../../../utils/cookie.util";
import { COOKIE_CONSTANTS } from "../../../constants";
import config from 'config'
import { NextFunction, Request } from "express";
import { IAppResponse } from "../../../types";
import { APP_MESSAGES } from "../../../languages";

export const DecodeToken = async (req: Request, res: IAppResponse, next: NextFunction) => {
    try {
        const accessToken = res.locals.store.accessToken;
        const refreshToken = res.locals.store.refreshToken;

        const result = await verifyOrGenerateAccessTokenIfExpired(refreshToken, accessToken);

        if (result.payload === null) throw new AppError(APP_MESSAGES.ACCOUNT.NOT_LOGIN, 401);

        if (result.accessToken) {
            setCookie(res, COOKIE_CONSTANTS.accessToken, result.accessToken, config.get<number>("accessTokenExpiresIn"))
            res.locals.store.accessToken = result.accessToken;
        }

        res.locals.payload = result.payload!;

        return next();
    } catch (err: any) {
        throw err;
    }
};
