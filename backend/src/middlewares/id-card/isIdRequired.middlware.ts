import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/error.util';
import { IAppResponse } from '../../types';
import { APP_MESSAGES } from '../../languages';
import { User } from '../../models';

export const IsIdRequired = (required: boolean = true) => {
    return (req: Request, res: IAppResponse, next: NextFunction) => {
        try {
            const user = res.locals.account as User;

            if (user.idPhotoUrl == null && required) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.ID_NOT_VERIFIED, 403));
            }

            next();
        } catch (err: any) {
            next(err);
        }
    };
}
