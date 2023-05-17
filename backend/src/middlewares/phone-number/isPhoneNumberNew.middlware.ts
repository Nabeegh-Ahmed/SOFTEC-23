import { NextFunction, Request } from 'express';
import AppError from '../../utils/error.util';
import { IAppResponse } from '../../types';
import { APP_MESSAGES } from '../../languages';
import { User } from '../../models';
import { UserService } from '../../services/accounts';


const userService: UserService = new UserService();

// this middlware is used to check if the phone number is already assigned to another user
export const IsPhoneNumberNew = (newPhoneNumber: boolean = false) => {
    return async (req: Request, res: IAppResponse, next: NextFunction) => {
        try {
            let { _id, phoneNumber } = res.locals.account as User;
            phoneNumber = phoneNumber || req.body.phoneNumber;

            // based on newPhoneNumber value, check if the phone number is already assigned to another user
            const matchedUser = await userService.findOne({
                phoneNumber: phoneNumber,
                _id: { $ne: _id },
                isPhoneNumberVerified: true
            });

            if (matchedUser && newPhoneNumber) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.PHONE_NUMBER_ALREADY_EXIST, 400));
            }

            if (!matchedUser && !newPhoneNumber) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.PHONE_NUMBER_NOT_EXIST, 400));
            }

            return next();
        } catch (error: any) {
            next(error);
        }
    };
}
