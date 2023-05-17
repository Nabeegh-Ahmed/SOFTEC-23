import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/error.util';
import { IAppResponse } from '../../types';
import { APP_MESSAGES } from '../../languages';
import { User } from '../../models';

export const IsPhoneNumberRequired = (req: Request, res: IAppResponse, next: NextFunction) => {
    try {
        const { phoneNumber } = res.locals.account as User;

        if (!phoneNumber) {
            throw (new AppError(APP_MESSAGES.ACCOUNT.PHONE_NUMBER_REQUIRED, 403));
        }

        return next();
    } catch (error: any) {
        next(error);
    }
};
