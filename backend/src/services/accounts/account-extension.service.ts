import { AccountExtension } from "../../models/accounts/account-extension.model";
import { IExcludedFields } from "../../types";
import { BaseService } from "../base.service";

export class AccountExtensionService extends BaseService<AccountExtension> {
    constructor(excludedFields: IExcludedFields<AccountExtension> = []) {
        super(AccountExtension, excludedFields);
    }
}