import { Order } from "../../models/order";
import { OrderService } from "../../services/order";
import { IAppResponse, InventoryType } from "../../types";
import { BaseController } from "../base.controller";
import { NextFunction, Request } from "express";
import Logger from "../../utils/logger.util";
import { CreateOneSchema, GetManySchema, GetOneSchema } from "../../schema/shared.schema";
import { User } from "../../models";
import { omit } from "lodash";
import { GamingGearService, VideoGameService } from "../../services/inventory";
import { PaymentService } from "../../services/payments.service";

export class OrderController extends BaseController<Order>{
    static excludedFields: (keyof Order)[] = [];

    constructor(service: OrderService = new OrderService()) {
        super(service, OrderController.excludedFields);
    }

    createOne = async <Params = any, ResponseBody = any, RequestBody extends CreateOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const input = req.body || {};
            const user = res.locals.account as User;

            const paymentService = new PaymentService()

            const order = {
                ...input,
                buyer: user._id
            }

            const { data } = await this.helperController.createOne(order);

            const gamingGearService = new GamingGearService()
            const videoGameService = new VideoGameService()

            const items = await Promise.all(data.items.map(async (item) => {
                let fetchedItem
                if (item.itemType === InventoryType.GAMING_GEAR) {
                    fetchedItem = await gamingGearService.findById(item.item._id.toString(), { lean: true })
                    await gamingGearService.updateById(item.item._id.toString(), {
                        quantity: fetchedItem.quantity - item.quantity
                    })
                } else {
                    fetchedItem = await videoGameService.findById(item.item._id.toString(), { lean: true })
                    await videoGameService.updateById(item.item._id.toString(), {
                        quantity: fetchedItem.quantity - item.quantity
                    })
                }

                return {
                    quantity: item.quantity,
                    price: fetchedItem.payment_id
                }
            }));

            const paymentSession = await paymentService.createPaymentSession(data._id.toString(), items)

            res.status(201).json({
                data: data ? omit(JSON.parse(JSON.stringify(data)), this.excludedFields) : data,
                payment: paymentSession
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };

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

    findByUser = async <Params = any, ResponseBody = any, RequestBody extends GetManySchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const user = res.locals.account as User;
            console.log(user._id)
            const { filter = {}, pagination = {}, sortProps = {}, } = req.body || {};
            const { data, count } = await this.helperController.findMany(
                { pagination, sortProps },
                {
                    buyer: user._id
                },
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
    

    findById = async <Params = any, ResponseBody = any, RequestBody extends GetOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { filter = {} } = req.body || {};

            const { data } = await this.helperController.findOne(filter);
            const gamingGearService = new GamingGearService()
            const videoGameService = new VideoGameService()

            const items = await Promise.all(data.items.map(async (item) => {
                let fetchedItem
                if (item.itemType === InventoryType.GAMING_GEAR) {
                    fetchedItem = await gamingGearService.findById(item.item._id.toString(), { lean: true })
                } else {
                    fetchedItem = await videoGameService.findById(item.item._id.toString(), { lean: true })
                }

                return {
                    quantity: item.quantity,
                    item: fetchedItem
                }
            }));

            const order = {
                _id: data._id,
                status: 'DRAFT',
                items: items
            }

            res.status(200).json({
                data: order ? omit(JSON.parse(JSON.stringify(order)), this.excludedFields) : order,
            });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };

    orderPaid = async <Params extends { id: string }, ResponseBody = any, RequestBody extends GetOneSchema['body'] = any, RequestQuery = qs.ParsedQs>(
        req: Request<Params, ResponseBody, RequestBody, RequestQuery>,
        res: IAppResponse,
        next: NextFunction
    ) => {
        try {
            const { filter = {} } = req.body || {};
            await this.helperController.updateById(req.params.id!, {
                status: 'PAID'
            });

            res.redirect("http://localhost:5173/app")
            // res.status(200).json({
            //     message: "payment successful"
            // });
        } catch (err: any) {
            Logger.error(err);
            next(err);
        }
    };
}

