import { IAppResponse } from '../../types/context.type';
import { DeserializeToken, DecodeToken, IsValidSession, IsAuthenticated, IsStatus, IsAuthorized, IsAuhtorizedById } from './helpers';
import { AccountRole, AccountStatus } from '../../types/enums';
import { IsVerifiedAccount } from './helpers/isVerifiedAccount.middleware';
import { NextFunction, Request } from 'express';
import { IAccountMiddlewareFlags } from '../../types';


export const IsValidAccount = (
    allowedRoles: AccountRole[],
    status: AccountStatus = AccountStatus.ACTIVE,
    flags: IAccountMiddlewareFlags = {}
) => {
    const middleware = async (req: Request, res: IAppResponse, next: NextFunction) => {
        try {
            const _next = async () => { };

            const {
                checkSession = true,
                requireAccessToken = true,
                requireRefreshToken = true,
                emailVerifyStatus = true,
                phoneVerifyStatus,
                identityVerifyStatus,
                authorizedById = false
            } = flags;

            

            await DeserializeToken(requireAccessToken, requireRefreshToken)(req, res, _next);
            console.log(res.locals.access_token)
            await DecodeToken(req, res, _next);

            await IsAuthenticated(req, res, _next);

            // await IsVerifiedAccount(phoneVerifyStatus, emailVerifyStatus, identityVerifyStatus)(req, res, _next);
            await IsStatus(status)(req, res, _next);
            await IsAuthorized(...allowedRoles)(req, res, _next);

            authorizedById && await IsAuhtorizedById(req, res, _next);

            return next();
        } catch (err: any) {
            next(err);
        }
    };

    return middleware;
};