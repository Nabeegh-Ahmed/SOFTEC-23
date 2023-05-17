import { omit } from "lodash";
import { User } from "../models/accounts";
import { InventoryRating } from "../models/inventory-rating.model";
import { CreateOneSchema, GetOneByIdSchema, GetOneSchema } from "../schema/shared.schema";
import { InventoryRatingService } from "../services/inventory-rating.service";
import { IAppResponse, InventoryType } from "../types";
import { BaseController } from "./base.controller";
import {Request, NextFunction} from "express"
import Logger from "../utils/logger.util";
import { GamingGearService, VideoGameService } from "../services/inventory"

export class InventoryRatingController extends BaseController<InventoryRating>{
    static excludedFields: (keyof InventoryRating)[] = [];

    constructor(service: InventoryRatingService = new InventoryRatingService()) {
        super(service, InventoryRatingController.excludedFields);
    }
    
    createOne = async <Params = any, ResponseBody = any, RequestBody extends CreateOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || {};
            const user = res.locals.account as User;

            const rating = {
                ...input,
                user: user._id
            }


            const { data } = await this.helperController.createOne(rating);

            const { itemType, item } = data;
            const inventoryService = itemType === InventoryType.GAMING_GEAR ? new GamingGearService() : new VideoGameService();
            await inventoryService.updateOne({ _id: item }, { $push: { ratings: data._id } })


            res.status(201).json({
                data: omit(data, this.excludedFields)
            })
        } catch (error) {
            Logger.error(error);
            next(error);
        }
    }
}