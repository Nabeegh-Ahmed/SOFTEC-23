import { Request } from 'express';

import { Response } from "express";
import { AccountRole } from './enums';
import { IAccount, User } from '../models';
import { ISessionTokens } from './account.type';
import { Contract } from '../models/contract';


export interface IPayload {
    accountId: string;
    role: AccountRole;
}

export interface IPayloadExtension extends IPayload {
    iat: number;
    exp: number;
}


export interface ISession {
    _id: string;
}

// an interface to store different types of data passed by the middlewares
export interface IStore {
    accessToken?: string;
    refreshToken?: string;

    contract?: Contract;
}


export interface IAppResponseLocals extends ISessionTokens {
    account: IAccount;
    payload: IPayload;
    session?: ISession;
    store: IStore;
}

export type IAppResponse = Response<{}, IAppResponseLocals>;
