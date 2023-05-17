import { User } from '../../models';
import { UserService } from '../../services/accounts';
import { UserController } from '../accounts';
import { BaseAuthController } from './base-auth.controller';

export class UserAuthController extends BaseAuthController<User>{
    constructor(service: UserService = new UserService(),) {
        super(service, UserController.excludedFields);
    }
}
