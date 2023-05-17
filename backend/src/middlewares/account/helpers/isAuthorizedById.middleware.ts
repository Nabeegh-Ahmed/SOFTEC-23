import AppError from "../../../utils/error.util";
import { APP_MESSAGES } from "../../../languages";
import { NextFunction, Request } from "express";
import { AccountRole, IAppResponse } from "../../../types";

export const IsAuhtorizedById = async (
    req: Request,
    res: IAppResponse,
    next: NextFunction
) => {
    try {
        const { id: userId } = req.params;
        const account = res.locals.account;

        if (userId && account.role === AccountRole.USER) {
            if (account._id.toString() !== userId) {
                throw new AppError(APP_MESSAGES.ACCOUNT.UNAUTHORIZED, 403);
            }
        }

        return next();
    } catch (err: any) {
        throw err;
    }
};
