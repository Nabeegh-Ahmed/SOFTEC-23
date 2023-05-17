import Logger from '../utils/logger.util';
import { CreateOneSchema, DeleteOneByIdSchema, GetManySchema, GetOneSchema, GetOneByIdSchema, UpdateOneByIdSchema, GetOneOrCreateSchema } from '../schema/shared.schema';

import { BaseService } from '../services/base.service';
import { IAppResponse } from '../types';
import { NextFunction, Request } from 'express';
import { BaseHelperController } from './base-helper.controller';
import { omit } from 'lodash';


export class BaseController<T> {
    constructor(
        protected service: BaseService<T>,
        protected excludedFields: (keyof T)[] = [],
        public helperController: BaseHelperController<T> = new BaseHelperController<T>(service)
    ) { }

    findMany = async <Params = any, ResponseBody = any, RequestBody extends GetManySchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { filter = {}, pagination = {}, sortProps = {}, } = req.body || {};

            const { data, count } = await this.helperController.findMany(
                { pagination, sortProps },
                filter,
            );

            res.status(200).json({
                data: data.map(item => item ? omit(JSON.parse(JSON.stringify(item)), this.excludedFields) : item),
                count,
            });

        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };

    findOne = async <Params = any, ResponseBody = any, RequestBody extends GetOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { filter = {} } = req.body || {};

            const { data } = await this.helperController.findOne(filter);
            res.status(200).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };

    findById = async <Params extends GetOneByIdSchema['params'] = any, ResponseBody = any, RequestBody extends GetOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { filter = {} } = req.body || {};

            const { data } = await this.helperController.findById(id, filter);
            res.status(200).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };


    findOneOrCreate = async <Params = any, ResponseBody = any, RequestBody extends GetOneOrCreateSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { filter = {}, input = {} } = req.body || {};

            const { data } = await this.helperController.findOneOrCreate(filter, input);
            res.status(200).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };


    createOne = async <Params = any, ResponseBody = any, RequestBody extends CreateOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || {};
            const { data } = await this.helperController.createOne(input);
            res.status(201).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };



    updateById = async<Params extends UpdateOneByIdSchema['params'] = any, ResponseBody = any, RequestBody = UpdateOneByIdSchema['body'], RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const input = req.body || {};

            const { data } = await this.helperController.updateById(id, input);
            res.status(200).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };

    deleteById = async <Params extends DeleteOneByIdSchema['params'] = any, ResponseBody = any, RequestBody = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { data } = await this.helperController.deleteById(id);

            res.status(200).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
            });
        }
        catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };
}
