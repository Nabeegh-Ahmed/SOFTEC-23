import { IBaseModel } from '../base.model';
import { Severity, modelOptions, pre, prop } from '@typegoose/typegoose';
import { InventoryType } from '../../types/enums';
import { InventoryRating } from '../inventory-rating.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

@pre<IInventoryItem>("save", async function (next) {
    if (!this.isModified("market_price") && !this.isModified("market_price")) return;

    this.margin = this.market_price - this.cost_price
    next();
})
@pre<IInventoryItem>("findOneAndUpdate", async function (next) {
    const _update = this.getUpdate() as IInventoryItem

    if (!_update.cost_price && !_update.market_price) return;

    _update.margin = _update.cost_price - _update.market_price

    this.setUpdate(_update);

    next();
})
export abstract class IInventoryItem extends IBaseModel {
    

    @prop({ required: true })
    quantity: number;

    @prop({ required: true })
    title: string;

    @prop({ required: false })
    description: string;

    @prop({ required: false })
    photo: string;

    @prop({ required: true })
    market_price: number;

    @prop({ required: true })
    cost_price: number;

    @prop({ required: false })
    margin: number;

    @prop({ required: true })
    inventory_type: InventoryType

    @prop({ required: true })
    minimum_age: number;

    @prop({ required: true })
    payment_id: string
}
