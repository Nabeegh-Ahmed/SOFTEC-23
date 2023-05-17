import { omit } from "lodash";
import { User } from "../models/accounts";
import { FavoriteProducts } from "../models/favorite-products.model";
import { CreateOneSchema } from "../schema/shared.schema";
import { FavoriteProductService } from "../services/favorite-products.service";
import { IAppResponse } from "../types";
import { BaseController } from "./base.controller";
import {Request, NextFunction} from "express"
import Logger from "../utils/logger.util";
import { UserService } from "../services/accounts";

export class FavoriteProductsController extends BaseController<FavoriteProducts>{
    static excludedFields: (keyof FavoriteProducts)[] = [];

    constructor(service: FavoriteProductService = new FavoriteProductService()) {
        super(service, FavoriteProductsController.excludedFields);
    }

    createOne = async <Params = any, ResponseBody = any, RequestBody extends CreateOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || {};
            const user = res.locals.account as User;

            const favoriteProducts = {
                ...input,
                user: user._id
            }

            const { data } = await this.helperController.createOne(favoriteProducts);

            const userService = new UserService()
            userService.updateById(user._id.toString(), {
                $push: { favoriteProducts: data._id }
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