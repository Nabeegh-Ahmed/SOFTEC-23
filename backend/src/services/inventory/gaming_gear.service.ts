
import { GamingGear } from "../../models/inventory";
import { BaseService } from "../base.service";
import { IExcludedFields } from "../../types";

export class GamingGearService extends BaseService<GamingGear> {
    constructor(excludedFields: IExcludedFields<GamingGear> = []) {
        super(GamingGear, excludedFields);
    }
}