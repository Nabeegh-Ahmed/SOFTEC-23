
import { VideoGame } from "../../models/inventory";
import { BaseService } from "../base.service";
import { IExcludedFields } from "../../types";
import { UpdateQuery } from "mongoose";
import { AnyParamConstructor, DocumentType } from "@typegoose/typegoose/lib/types";
import { PaymentService } from "../payments.service";

export class VideoGameService extends BaseService<VideoGame> {
    constructor(excludedFields: IExcludedFields<VideoGame> = []) {
        super(VideoGame, excludedFields);
    }

    
}