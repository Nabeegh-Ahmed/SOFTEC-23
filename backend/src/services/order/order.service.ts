
import { Order } from "../../models/order";
import { BaseService } from "../base.service";
import { IExcludedFields } from "../../types";

export class OrderService extends BaseService<Order> {
    constructor(excludedFields: IExcludedFields<Order> = []) {
        super(Order, excludedFields);
    }
}