
import { FavoriteProducts } from "../models/favorite-products.model";
import { BaseService } from "./base.service";
import { IExcludedFields } from "../types";

export class FavoriteProductService extends BaseService<FavoriteProducts> {
    constructor(excludedFields: IExcludedFields<FavoriteProducts> = []) {
        super(FavoriteProducts, excludedFields);
    }
}