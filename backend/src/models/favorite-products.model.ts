import { User } from './accounts';
import { IBaseModel } from './base.model';
import { Ref, Severity, modelOptions, pre, prop } from '@typegoose/typegoose';
import { GamingGear } from './inventory/gaming_gear.model';
import { VideoGame } from './inventory/video_game.model';
import { InventoryType } from '../types';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

export class FavoriteProducts extends IBaseModel {
    @prop({ req: true, ref: () => User })
    user: Ref<User>

    @prop({
        required: true,
        ref: () => GamingGear || VideoGame
    })
    item!: Ref<GamingGear | VideoGame>

    @prop({
        required: true,
        type: String,
        enum: InventoryType
    })
    itemType!: InventoryType
}
