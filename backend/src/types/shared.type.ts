import { AnyParamConstructor, DocumentType } from "@typegoose/typegoose/lib/types";
import { FilterQuery, QueryOptions } from "mongoose";
import { User } from "../models";
import { Response } from "express";

export interface IPopulate<T, U extends AnyParamConstructor<T> = AnyParamConstructor<T>> {
    path: string;
    populate?: IPopulate<T, U> | IPopulate<T, U>[];
    match?: FilterQuery<DocumentType<InstanceType<U>, T>>;
    options?: QueryOptions;
    select?: string;
}

export interface IEmailUserInfo {
    name: string;
    email: string;
}


export type IExcludedFields<T> = (keyof T)[];


export interface ICode {
    code: string;
}