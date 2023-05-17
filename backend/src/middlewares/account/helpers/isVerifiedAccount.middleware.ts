import AppError from '../../../utils/error.util';
import { APP_MESSAGES } from '../../../languages';
import { IAppResponse } from '../../../types';
import { NextFunction, Request } from 'express';
import { User } from '../../../models';

export const IsVerifiedAccount = (phoneStatus?: Boolean, emailStatus?: Boolean, identityStatus?: Boolean) => {
    const middleware = async (req: Request, res: IAppResponse, next: NextFunction) => {
        try {
            const user = res.locals.account as User;
            // check if phone is verified (if required)
            if (phoneStatus !== undefined && phoneStatus != user.isPhoneNumberVerified) {
                throw new AppError(
                    phoneStatus ? APP_MESSAGES.ACCOUNT.PHONE_NUMBER_NOT_VERIFIED : APP_MESSAGES.ACCOUNT.PHONE_NUMBER_ALREADY_VERIFIED
                    , 403);
            }

            // check if email is verified (if required)
            if (emailStatus !== undefined && emailStatus != user.isEmailVerified) {
                throw new AppError(
                    emailStatus ? APP_MESSAGES.ACCOUNT.EMAIL_NOT_VERIFIED : APP_MESSAGES.ACCOUNT.EMAIL_ALREADY_VERIFIED
                    , 403);
            }

            // check if identity is verified (if required)
            if (identityStatus !== undefined && identityStatus != user.isIdVerified) {
                throw new AppError(
                    identityStatus ? APP_MESSAGES.ACCOUNT.ID_NOT_VERIFIED : APP_MESSAGES.ACCOUNT.ID_ALREADY_VERIFIED
                    , 403);
            }

            return next();
        } catch (err: any) {
            throw err;
        }
    };
    return middleware;
};