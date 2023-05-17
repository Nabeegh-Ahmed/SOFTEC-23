import { NextFunction, Request, Response } from 'express';
import AppError from '../../../utils/error.util';
import { AccountStatus } from '../../../types/enums';
import { APP_MESSAGES } from '../../../languages';
import { IAppResponse } from '../../../types';

export const IsStatus = (status: AccountStatus = AccountStatus.ACTIVE) => {
  const middleware = async (req: Request, res: IAppResponse, next: NextFunction
  ) => {
    try {
      const account = res.locals.account;

      if (account.status != status) {
        throw new AppError(
          status == AccountStatus.ACTIVE
            ? APP_MESSAGES.ACCOUNT.NOT_ACTIVE
            : APP_MESSAGES.ACCOUNT.ACTIVE,
          403);
      }
      return next();
    } catch (err: any) {
      throw err;
    }
  };
  return middleware;
};