import Logger from '../../utils/logger.util';
import AppError from '../../utils/error.util';
import config from 'config';
import { COOKIE_CONSTANTS } from '../../constants';
import { APP_MESSAGES } from '../../languages';
import { createHash, createSession, createVerificationTokens, setCookie } from '../../utils';
import redisClient from '../../config/db/redis.db';
import { FilterQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { BaseService } from '../../services/base.service';
import { AccountProvider, AccountStatus, IAppResponse } from '../../types';
import { AccountEmailHelper } from '../../utils/email';
import { NextFunction, Request } from 'express';
import { AccountExtensionService } from '../../services/accounts';
import { IAccount, accountConfig } from '../../models';
import { AccountForgetPasswordSchema, AccountGoogleLoginSchema, AccountLoginSchema, AccountResetPasswordSchema, AccountSignupSchema, AccountVerifyEmailSchema } from '../../schema/account/shared.schema';
import { GoogleService } from '../../services/accounts/google.service';
import { omit } from 'lodash';

export class BaseAuthController
    <T extends IAccount>
{
    static verifyEmailRedirectUrl = (code: string) => `${config.get<string>("origin")}/verifyemail/${code}`;
    static resetPasswordRedirectUrl = (code: string) => `${config.get<string>("origin")}/resetpassword/${code}`;

    constructor(
        private service: BaseService<T>,
        protected excludedFields: (keyof T)[] = [],
        private accountExtensionService: AccountExtensionService = new AccountExtensionService(),
        private googleService: GoogleService = new GoogleService(),
    ) { }
    signup = async <Params = any, ResponseBody = any, RequestBody extends AccountSignupSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            let accountInfo = req.body as Partial<T>;
            const account = await this.service.createOne(accountInfo);

            // Create Verification Code
            const emailVerificationObject = createVerificationTokens(
                config.get<number>("emailVerificationCodeExpiresIn"),
            )

            // save email verification code in database
            this.accountExtensionService.updateOne(
                { _id: account._id },
                {
                    $set: {
                        emailVerificationTokenHash: emailVerificationObject.hash,
                        emailVerificationTokenExpiry: emailVerificationObject.expiresAt,
                        account: account._id,
                        role: account.role,
                    }
                },
                { upsert: true }
            );

            // verification url
            const redirectUrl = BaseAuthController.verifyEmailRedirectUrl(emailVerificationObject.code);

            try {
                // Send verification code to the user on email
                await new AccountEmailHelper({
                    email: account.email!,
                    name: account.name!,
                }).sendEmailVerificationCode(redirectUrl);
            } catch (err: any) {
                Logger.error("Error while sending email verification code", err);

                // delete verification code from database
                this.accountExtensionService.updateOne(
                    { _id: account._id },
                    {
                        $unset: {
                            emailVerificationTokenHash: 1,
                            emailVerificationTokenExpiry: 1,
                        }
                    },
                );
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_VERIFICATION_FAILED));
            }

            res.status(201).json({
                message: APP_MESSAGES.ACCOUNT.EMAIL_VERIFICATION_CODE_SENT,
                data: account ? omit(JSON.parse(JSON.stringify(account)), this.excludedFields) : null,
            });
        } catch (err: any) {
            Logger.error(err);
            if (err.code === 11000) {
                next(new AppError(APP_MESSAGES.ACCOUNT.EMAIL_ALREADY_EXISTS, 409));
            }
            next(err);
        }
    };

    login = async <Params = any, ResponseBody = any, RequestBody extends AccountLoginSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { email, password } = req.body;

            const query = { email } as FilterQuery<DocumentType<T, T>>;
            let account = await this.service.findOne(query) as T;

            if (!account) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_FOUND, 400));
            }
            const isPasswordMatched = await account.comparePasswords(password);

            // check if password is correct
            if (!isPasswordMatched) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.INVALID_LOGIN_CREDENTIALS, 400));
            }

            // check if account is active
            if (account.status !== AccountStatus.ACTIVE) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_ACTIVE, 400));
            }

            // email is not verified
            // if (!account.isEmailVerified) {
            //     throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_NOT_VERIFIED, 400));
            // }

            // create new session
            const { accessToken, refreshToken } = await createSession({
                accountId: account._id.toString(),
                role: account.role,
            });

            setCookie(res, COOKIE_CONSTANTS.refreshToken, refreshToken, config.get<number>("refreshTokenExpiresIn"))
            setCookie(res, COOKIE_CONSTANTS.accessToken, accessToken, config.get<number>("accessTokenExpiresIn"))
            setCookie(res, COOKIE_CONSTANTS.loggedIn, true, config.get<number>("accessTokenExpiresIn"))

            res.status(200).json({
                message: APP_MESSAGES.ACCOUNT.LOGGED_IN,
                data: account ? omit(JSON.parse(JSON.stringify(account)), this.excludedFields) : null,
                accessToken,
                refreshToken,
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };


    logout = async <Params = any, ResponseBody = any, RequestBody = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const account = res.locals.account;
            redisClient.del(account._id.toString());

            res.clearCookie(COOKIE_CONSTANTS.refreshToken);
            res.clearCookie(COOKIE_CONSTANTS.accessToken);
            res.clearCookie(COOKIE_CONSTANTS.loggedIn);

            res.status(200).json({
                message: APP_MESSAGES.ACCOUNT.LOGOUT_SUCCESS,
                data: null
            });
        }
        catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };


    forgotPassword = async <Params = any, ResponseBody = any, RequestBody extends AccountForgetPasswordSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { email } = req.body;

            // Check if user exists
            const query = { email } as FilterQuery<DocumentType<T, T>>;
            let account = await this.service.findOne(query) as T;

            if (!account) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_FOUND, 400));
            }

            // Check if user is active
            if (account.status !== AccountStatus.ACTIVE) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_ACTIVE, 400))
            }

            // Check if user email is verified
            if (!account.isEmailVerified) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_NOT_VERIFIED, 400));
            }

            // Generate reset token
            const passwordResetTokensObject = createVerificationTokens(
                config.get<number>("passwordResetTokenExpiresIn")
            );


            // Save reset token in database
            await this.accountExtensionService.updateOne(
                { _id: account._id },
                {
                    $set: {
                        'resetPasswordTokenHash': passwordResetTokensObject.hash,
                        'resetPasswordTokenExpiry': passwordResetTokensObject.expiresAt
                    }
                }
            );

            const redirectUrl = BaseAuthController.resetPasswordRedirectUrl(passwordResetTokensObject.code);

            try {
                // Send email to user
                await new AccountEmailHelper({
                    email: account.email!,
                    name: account.name!,
                }).sendResetPassword(redirectUrl);
            } catch (err: any) {
                Logger.error("Error while sending email password reset code", err);

                // Remove reset token from database
                await this.accountExtensionService.updateOne(
                    { _id: account._id },
                    {
                        $unset: {
                            'resetPasswordTokenHash': 1,
                            'resetPasswordTokenExpiry': 1,
                        }
                    }
                );
                throw (new AppError(APP_MESSAGES.ACCOUNT.PASSWORD_RESET_FAILED, 400));
            }

            res.status(200).json({
                message: APP_MESSAGES.ACCOUNT.PASSWORD_RESET_EMAIL_SENT,
                data: null
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };


    resetPassword = async <Params extends AccountResetPasswordSchema['params'] = any, ResponseBody = any, RequestBody extends AccountResetPasswordSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { code } = req.params;
            const { password } = req.body;

            // Check if user exists
            const query = { resetPasswordTokenHash: createHash(code) } as FilterQuery<DocumentType<T, T>>;
            let accountExtension = await this.accountExtensionService.findOne(query);

            if (!accountExtension) {
                throw new AppError(APP_MESSAGES.ACCOUNT.PASSWORD_RESET_FAILED, 400);
            }

            // Check if token is expired
            if (accountExtension?.resetPasswordTokenExpiry! < new Date()) {
                throw new AppError(APP_MESSAGES.ACCOUNT.PASSWORD_RESET_CODE_EXPIRED, 400);
            }

            // Check if user is active
            const account = await this.service.findById(accountExtension.account._id.toString()) as T;

            if (!account) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_FOUND, 400));
            }

            if (account.status !== AccountStatus.ACTIVE) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_ACTIVE, 400));
            }

            // Check if user email is verified
            if (!account.isEmailVerified) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_NOT_VERIFIED, 400));
            }

            // Update password
            this.service.updateById(account._id.toString(), {
                password: password,
                passwordSalt: accountConfig.account.passwordSalt.default,
            });

            // Remove reset token from database
            await this.accountExtensionService.updateOne(
                { _id: accountExtension._id },
                {
                    $unset: {
                        'resetPasswordTokenHash': 1,
                        'resetPasswordTokenExpiry': 1,
                    }
                }
            );

            res.status(200).json({
                message: APP_MESSAGES.ACCOUNT.PASSWORD_RESET_SUCCESS,
                data: null
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };



    // verify email
    verifyEmail = async <Params extends AccountVerifyEmailSchema['params'] = any, ResponseBody = any, RequestBody = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { emailVerificationCode } = req.params;

            // Check if user exists
            const query = { emailVerificationTokenHash: createHash(emailVerificationCode) } as FilterQuery<DocumentType<T, T>>;
            let accountExtension = await this.accountExtensionService.findOne(query);

            if (!accountExtension) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_VERIFICATION_FAILED, 400));
            }

            // Check if token is expired
            if (accountExtension?.emailVerificationTokenExpiry! < new Date()) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_VERIFICATION_CODE_EXPIRED, 400));
            }

            // Check if user is active
            const account = await this.service.findById(accountExtension.account._id.toString()) as T;

            if (!account) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_FOUND, 400));
            }

            if (account.status !== AccountStatus.ACTIVE) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.NOT_ACTIVE, 400));
            }

            // verify email
            await this.service.updateById(account._id.toString(), {
                isEmailVerified: true,
            });

            // Remove reset token from database
            await this.accountExtensionService.updateOne(
                { _id: accountExtension._id },
                {
                    $unset: {
                        'emailVerificationTokenHash': 1,
                        'emailVerificationTokenExpiry': 1,
                    }
                }
            );

            res.status(200).json({
                message: APP_MESSAGES.ACCOUNT.EMAIL_VERIFIED,
                data: null
            });

        } catch (err) {
            Logger.error(err);
            next(err);
        }
    };

    // google login
    googleLogin = async <Params = any, ResponseBody = any, RequestBody extends AccountGoogleLoginSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { code, state = "/" } = req.body;

            const { id_token, access_token } = await this.googleService.getOauthToken({ code });

            const { name, email, verified_email, picture } = await this.googleService.getUser({ id_token, access_token });
            console.log({ name, email, verified_email, picture });

            // Check if user verified email
            if (!verified_email) {
                throw (new AppError(APP_MESSAGES.ACCOUNT.EMAIL_NOT_VERIFIED, 400));
            }

            // update account if exists or create new user
            const account = await this.service.updateOne(
                { email },
                {
                    name,
                    email,
                    isEmailVerified: true,
                    photo: picture,
                    provider: AccountProvider.GOOGLE,
                    status: AccountStatus.ACTIVE,
                },
                { upsert: true }
            );

            // create session
            const { accessToken, refreshToken } = await createSession({
                accountId: account._id.toString(),
                role: account.role,
            });

            // set cookie
            setCookie(res, COOKIE_CONSTANTS.refreshToken, refreshToken, config.get<number>("refreshTokenExpiresIn"))
            setCookie(res, COOKIE_CONSTANTS.accessToken, accessToken, config.get<number>("accessTokenExpiresIn"))
            setCookie(res, COOKIE_CONSTANTS.loggedIn, true, config.get<number>("accessTokenExpiresIn"))

            res.redirect(`${config.get<string>("origin")}${state}`);
        } catch (err) {
            Logger.error(err);
            next(err);
        }
    };
}
