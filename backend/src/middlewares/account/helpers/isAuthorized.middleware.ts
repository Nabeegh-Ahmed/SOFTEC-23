import AppError from '../../../utils/error.util';
import { AccountRole } from '../../../types/enums';
import { APP_MESSAGES } from '../../../languages';
import { NextFunction, Request } from 'express';
import { IAppResponse } from '../../../types';

export const IsAuthorized = (...allowedRoles: AccountRole[]) => {
  const middleware = async (req: Request, res: IAppResponse, next: NextFunction) => {
    try {
      const { role } = res.locals.payload;
      if (!allowedRoles.includes(role)) {
        throw new AppError(APP_MESSAGES.ACCOUNT.FORBIDDEN, 403);
      }

      return next();
    } catch (err: any) {
      throw err;
    }
  };
  return middleware;
};
