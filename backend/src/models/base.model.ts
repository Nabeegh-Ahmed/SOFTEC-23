import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";

export abstract class IBaseModel {
    @prop({
        auto: true,
    })
    public _id: ObjectId;

    @prop({ required: true, default: false })
    public isDeleted!: boolean;

    @prop()
    public deletedAt: Date;

    @prop()
    public createdAt: Date;

    @prop()
    public updatedAt: Date;
}
