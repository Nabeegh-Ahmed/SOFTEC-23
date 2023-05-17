import { NextFunction, Request } from "express";
import { BaseService } from "../../services/base.service";
import { AccountRole, IAppResponse } from "../../types";
import Logger from "../../utils/logger.util";
import { BaseController } from "../base.controller";
import { omit } from "lodash";
import { UserGetOneByIdSchema } from "../../schema/account";
import { User } from "../../models";
import AppError from "../../utils/error.util";
import { APP_MESSAGES } from "../../languages";

export class BaseAccountController<T> extends BaseController<T>{
    constructor(protected service: BaseService<T>,
        protected excludedFields: (keyof T)[] = []
    ) {
        super(service, excludedFields);
    }

    findMe = async (
        req: Request<UserGetOneByIdSchema['params'], any, UserGetOneByIdSchema['body']>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            let account = res.locals.account;
            const { id: userId } = req.params;
            const { filter } = req.body || {};

            if (userId && account.role === AccountRole.ADMIN) {
                account = await this.service.findById(userId, filter, [{path: 'favoriteProducts disputes'}]) as User;

                if (!account) {
                    throw new AppError(APP_MESSAGES.ACCOUNT.NOT_FOUND, 404);
                }
            }

            res.status(200).json({
                data: account ? omit(JSON.parse(JSON.stringify(account)), this.excludedFields) : null,
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };
}
