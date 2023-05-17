
import { Dispute, DisputeMessage } from "../models/disputes.model";
import { BaseService } from "./base.service";
import { IExcludedFields } from "../types";

export class DisputeService extends BaseService<Dispute> {
    constructor(excludedFields: IExcludedFields<Dispute> = []) {
        super(Dispute, excludedFields);
    }
}

export class DisputeMessageService extends BaseService<DisputeMessage> {
    constructor(excludedFields: IExcludedFields<DisputeMessage> = []) {
        super(DisputeMessage, excludedFields);
    }
}