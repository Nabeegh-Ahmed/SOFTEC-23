import AppError from "../../../utils/error.util";
import { APP_MESSAGES } from "../../../languages";
import { AccountRole } from "../../../types/enums";
import { UserService } from "../../../services/accounts";
import { IAppResponse } from "../../../types";
import { NextFunction, Request } from "express";
import { User } from "../../../models";

const userService = new UserService();

export const IsAuthenticated = async (req: Request, res: IAppResponse, next: NextFunction) => {
  try {
    let account = null;

    const payload = res.locals.payload;
    const userId = res.locals.session?._id || payload.accountId;

    if (payload.role === AccountRole.USER) {
      account = await userService.findById(userId) as User;
    }
    else if (payload.role === AccountRole.ADMIN) {
      account = await userService.findById(userId) as User;
    }

    if (!account) {
      throw (new AppError(APP_MESSAGES.ACCOUNT.UNAUTHORIZED, 401));
    }

    res.locals.account = account;

    return next();
  } catch (err: any) {
    throw err;
  }
};
