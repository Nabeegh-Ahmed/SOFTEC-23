import {
    index,
    modelOptions,
    pre,
    prop,
    Ref,
    Severity,
} from "@typegoose/typegoose";

import { IInventoryItem } from "./base-inventory.model";
import { InventoryRating } from "../inventory-rating.model";
import { InventoryType } from "../../types";


@index({ title: 1 })
@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

// Export the User class to be used as TypeScript type
export class GamingGear extends IInventoryItem {
    @prop({ required: false, ref: () => InventoryRating }) 
    ratings: InventoryRating[]
    
    @prop({ required: true })
    manufacturer: string
}
