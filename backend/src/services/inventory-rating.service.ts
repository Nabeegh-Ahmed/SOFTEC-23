
import { InventoryRating } from "../models/inventory-rating.model";
import { BaseService } from "./base.service";
import { IExcludedFields } from "../types";

export class InventoryRatingService extends BaseService<InventoryRating> {
    constructor(excludedFields: IExcludedFields<InventoryRating> = []) {
        super(InventoryRating, excludedFields);
    }
}