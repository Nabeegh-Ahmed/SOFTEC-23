import Logger from '../utils/logger.util';
import { ListSchema, Pagination, SortProps } from '../schema/shared.schema';
import AppError from '../utils/error.util';

import { BaseService } from '../services/base.service';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { IPopulate } from '../types';


export class BaseHelperController<T> {
    constructor(protected service: BaseService<T>) { }

    findMany = async (
        input: ListSchema,
        query?: FilterQuery<T>,
        options?: QueryOptions,
        populate: IPopulate<T>[] = []
    ) => {
        try {
            const pagination = input.pagination as Pagination;
            const sortProps = input.sortProps as SortProps;

            const accounts = await this.service.findMany(
                query as FilterQuery<DocumentType<T, T>>,
                options,
                pagination,
                sortProps,
                populate
            );
            return {
                data: accounts as T[],
                count: accounts.length,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    findOne = async (
        query: FilterQuery<T>,
        options?: QueryOptions,
        populate: IPopulate<T>[] = []
    ) => {
        try {
            const account = await this.service.findOne(
                query as FilterQuery<DocumentType<T, T>>,
                options,
                populate
            );
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    findOneOrCreate = async (
        query: FilterQuery<T>,
        input: UpdateQuery<T>,
    ) => {
        try {
            const account = await this.service.findOneOrCreate(
                query as FilterQuery<DocumentType<T, T>>,
                input as UpdateQuery<DocumentType<T, T>>,
            );
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    createOne = async (
        input: UpdateQuery<T>
    ) => {
        try {
            const account = await this.service.createOne(input as UpdateQuery<DocumentType<T, T>>);
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    findById = async (
        id: string,
        options?: QueryOptions,
        populate: IPopulate<T>[] = []
    ) => {
        try {
            const account = await this.service.findById(id, options, populate);
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    updateById = async (
        id: string,
        input: UpdateQuery<T>,
        options?: QueryOptions,
        populate: IPopulate<T>[] = []
    ) => {
        try {
            const account = await this.service.updateById(
                id,
                input as UpdateQuery<DocumentType<T, T>>,
                options,
                populate
            );
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };

    deleteById = async (
        id: string,
        options?: QueryOptions,
        populate: IPopulate<T>[] = []
    ) => {
        try {
            const account = await this.service.deleteById(id, options, populate);
            return {
                data: account as T,
            };
        } catch (err: any) {
            Logger.error(err);
            throw new AppError(err.message, err.statusCode);
        }
    };
}
