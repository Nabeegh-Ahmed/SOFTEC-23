import { NextFunction, Request } from 'express';
import AppError from '../../utils/error.util';
import { IAppResponse } from '../../types';
import { APP_MESSAGES } from '../../languages';
import { User } from '../../models';
import { UserService } from '../../services/accounts';
import { UserUpdateIdentitySchema } from '../../schema/account';


const userService: UserService = new UserService();

// this middlware is used to check if the id number is already assigned to another user
export const IsIdNew = (newId: boolean = false) => {
    return async (
        req: Request<any, any, UserUpdateIdentitySchema['body']>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { _id } = res.locals.account as User;
            const { idNumber } = req.body;

            // based on newPhoneNumber value, check if the phone number is already assigned to another user
            const matchedUser = await userService.findOne({
                idNumber,
                _id: { $ne: _id },
                isIdVerified: true
            });

            if (matchedUser && newId) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.ID_ALREADY_EXIST, 400));
            }

            if (!matchedUser && !newId) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.ID_NOT_EXIST, 400));
            }

            return next();
        } catch (error: any) {
            next(error);
        }
    };
}
