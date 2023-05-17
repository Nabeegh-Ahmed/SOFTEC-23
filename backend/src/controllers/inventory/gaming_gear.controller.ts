import { GamingGear } from "../../models/inventory";
import { GamingGearService } from "../../services/inventory";
import { BaseController } from "../base.controller";
import { NextFunction, Request } from "express";
import Logger from "../../utils/logger.util";
import { PaymentService } from "../../services/payments.service";
import { IAppResponse, InventoryType } from "../../types";
import { omit } from "lodash";
import { CreateOneSchema, GetOneByIdSchema, GetOneSchema } from "../../schema/shared.schema";

export class GamingGearController extends BaseController<GamingGear>{
    static excludedFields: (keyof GamingGear)[] = [];

    constructor(service: GamingGearService = new GamingGearService()) {
        super(service, GamingGearController.excludedFields);
    }

    createOne = async <Params = any, ResponseBody = any, RequestBody extends CreateOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || {};
            const paymentService = new PaymentService()
            
            const stripeProduct = await paymentService.addProduct(input)
            const productInput = { ...input, payment_id: stripeProduct.default_price, inventory_type: InventoryType.GAMING_GEAR }
            const { data } = await this.helperController.createOne(productInput);

            res.status(201).json({
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

            const { data } = await this.helperController.findById(id, filter, [
                {
                    path: 'ratings',
                    populate: {
                        path: 'user',
                    }
                }
            ]);
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