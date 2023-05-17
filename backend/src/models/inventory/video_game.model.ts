import {
    index,
    modelOptions,
    pre,
    prop,
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

export class VideoGame extends IInventoryItem {
    @prop({ required: false, ref: () => InventoryRating }) 
    ratings: InventoryRating[]
    
    @prop({ required: true })
    publisher: string
}
