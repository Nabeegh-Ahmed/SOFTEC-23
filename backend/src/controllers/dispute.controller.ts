import { omit } from "lodash";
import { User } from "../models/accounts";
import { Dispute, DisputeMessage } from "../models/disputes.model";
import { CreateOneSchema, GetOneByIdSchema, GetOneSchema } from "../schema/shared.schema";
import { IAppResponse } from "../types";
import { BaseController } from "./base.controller";
import { Request, NextFunction } from "express"
import Logger from "../utils/logger.util";
import { UserService } from "../services/accounts";
import { DisputeMessageService, DisputeService } from "../services/dispute.service";

export class DisputeController extends BaseController<Dispute>{
    static excludedFields: (keyof Dispute)[] = [];

    constructor(service: DisputeService = new DisputeService()) {
        super(service, DisputeController.excludedFields);
    }

    findById = async <Params extends GetOneByIdSchema['params'] = any, ResponseBody = any, RequestBody extends GetOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { filter = {} } = req.body || {};

            const { data } = await this.helperController.findById(id, filter, [{ path: "messages", populate: { path: "user" } }]);


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
            const user = res.locals.account as User;

            const dispute = {
                ...input,
                user: user._id
            }

            const { data } = await this.helperController.createOne(dispute);

            const userService = new UserService()
            userService.updateById(user._id.toString(), {
                $push: { disputes: data._id }
            })

            res.status(201).json({
                data: omit(data, this.excludedFields)
            })
        } catch (error) {
            Logger.error(error);
            next(error);
        }
    }
}

export class DisputeMessageController extends BaseController<DisputeMessage>{
    static excludedFields: (keyof DisputeMessage)[] = [];

    constructor(service: DisputeMessageService = new DisputeMessageService()) {
        super(service, DisputeMessageController.excludedFields);
    }

    createOne = async <Params = any, ResponseBody = any, RequestBody = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || { dispute: "" };
            const user = res.locals.account as User;

            const dispute = {
                ...input,
                user: user._id
            }
            const { data } = await this.helperController.createOne(dispute);

            const disputeService = new DisputeService()

            // @ts-ignore
            disputeService.updateById(input.dispute, {
                $push: { messages: data._id }
            })

            res.status(201).json({
                data: omit(data, this.excludedFields)
            })
        } catch (error) {
            Logger.error(error);
            next(error);
        }
    }
}