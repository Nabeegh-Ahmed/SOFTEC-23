require('express-group-routes');
import express from 'express';
import { AccountRole, AccountStatus } from '../types/enums';
import { validate } from '../middlewares';
import { UserController } from '../controllers/accounts';
import { userGetManyContractsSchema, userGetManySchema, userGetOneByIdSchema, userPhoneNumberAddSchema, userUpdateIdentitySchema, userVerifyIdentitySchema, userVerifyPhoneNumberSchema } from '../schema/account';
import { IsValidAccount } from '../middlewares/account';

const userControllerInstance: UserController = new UserController();

const router = express.Router();

// Admin Get Users route
router.get('/', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), userControllerInstance.findMany);



// Get my info route
router.get('/:id', validate(userGetOneByIdSchema), IsValidAccount([AccountRole.USER, AccountRole.ADMIN], AccountStatus.ACTIVE, { authorizedById: true }), userControllerInstance.findMe);


// add phone number routes
// router.put("/phone-number", IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE, { phoneVerifyStatus: false }), IsPhoneNumberNew(true), validate(userPhoneNumberAddSchema), userControllerInstance.addPhoneNumber);


// otp routes
// router
//     .post("/otp/send", IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE, { phoneVerifyStatus: false }), IsPhoneNumberRequired, IsPhoneNumberNew(true), userControllerInstance.sendOtp)
    // .put("/otp/verify", IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE, { phoneVerifyStatus: false }), IsPhoneNumberRequired, IsPhoneNumberNew(true), validate(userVerifyPhoneNumberSchema), userControllerInstance.verifyPhoneNumber);


// identity routes
// router.route('/:id/identity')
//     .put(IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE, { identityVerifyStatus: false, authorizedById: true }), validate(userUpdateIdentitySchema), IsIdNew(true), userControllerInstance.updateIdentity)

// router.route('/:id/identity/verify')
//     .put(IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE, { authorizedById: true }), validate(userVerifyIdentitySchema), userControllerInstance.verifyIdentity)

// contract routes
// router.get('/:id/contracts', IsValidAccount([AccountRole.USER, AccountRole.ADMIN], AccountStatus.ACTIVE, { authorizedById: true }), validate(userGetManyContractsSchema), userControllerInstance.findContracts)


// TODO single contract routes

export default router;