
import AppError from "../../../utils/error.util";
import { APP_MESSAGES } from "../../../languages";
import { COOKIE_CONSTANTS } from "../../../constants";
import { IAppResponse } from "../../../types";
import { NextFunction, Request } from "express";
import Logger from "../../../utils/logger.util";

export const DeserializeToken = (accessTokenFlag: boolean = true, refreshTokenFlag: boolean = true) => {
    const middleware = async (req: Request, res: IAppResponse, next: NextFunction) => {
        try {

            if (accessTokenFlag) {

                let accessToken;
                if (
                    req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer")
                ) {
                    accessToken = req.headers.authorization.split(" ")[1];
                } else if (req.cookies.access_token) {
                    accessToken = req.cookies[COOKIE_CONSTANTS.accessToken]
                }

                if (!accessToken) {
                    throw new AppError(APP_MESSAGES.ACCOUNT.NOT_LOGIN, 401);
                }
                res.locals.store.accessToken = accessToken;
            }

            if (refreshTokenFlag) {
                let refreshToken;
                if (req.cookies?.refresh_token) {
                    refreshToken = req.cookies[COOKIE_CONSTANTS.refreshToken];
                }

                // Check if the refresh token is present
                res.locals.store.refreshToken = refreshToken;
            }

            return next();
        } catch (err: any) {
            Logger.error(err);
            throw err;
        }
    }

    return middleware;
};