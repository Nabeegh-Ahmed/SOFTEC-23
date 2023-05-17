import AppError from "../../../utils/error.util";
import { APP_MESSAGES } from "../../../languages";
import redisClient from "../../../config/db/redis.db";
import { NextFunction, Request } from "express";
import { IAppResponse } from "../../../types";

export const IsValidSession = async (req: Request, res: IAppResponse, next: NextFunction) => {
    try {
        const payload = res.locals.payload;
        const session = await redisClient.get(payload.accountId);

        // Check if the session is valid
        if (!session) {
            throw new AppError(APP_MESSAGES.ACCOUNT.UNAUTHORIZED, 401);
        }

        res.locals.session = JSON.parse(session);
        return next();
    } catch (err: any) {
        throw err;
    }
};
