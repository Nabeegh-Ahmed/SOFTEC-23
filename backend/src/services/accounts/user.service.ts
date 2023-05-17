
import { User } from "../../models";
import { BaseService } from "../base.service";
import { IExcludedFields } from "../../types";

export class UserService extends BaseService<User> {
    constructor(excludedFields: IExcludedFields<User> = []) {
        super(User, excludedFields);
    }
}