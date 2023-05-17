import { IBaseModel } from '../base.model';
import { Ref, Severity, modelOptions, prop } from '@typegoose/typegoose';
import { InventoryType } from '../../types/enums';
import { GamingGear, VideoGame } from '../inventory';
import { User } from '../accounts';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class LineItem {
    @prop({
        required: true,
        ref: () => GamingGear || VideoGame
    })
    item!: Ref<GamingGear | VideoGame>

    @prop({
        required: true,
        type: Number
    })
    quantity!: number

    @prop({
        required: true,
        type: String,
        enum: InventoryType
    })
    itemType!: InventoryType

    @prop({ required: true })
    market_price!: number;
}

export class Order extends IBaseModel {
    @prop({ required: false })
    payment_id: string;

    @prop({ required: false, default: "DRAFT" })
    status: string;

    @prop({ req: true, ref: () => User })
    buyer: Ref<User>

    @prop({
        required: true,
        type: () => LineItem
    })
    items!: LineItem[]

    @prop({ required: false })
    total: number;
}
