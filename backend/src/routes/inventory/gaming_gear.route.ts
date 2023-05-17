import express from 'express';
import { AccountRole } from '../../types/enums';
import { GamingGearController } from '../../controllers/inventory';
import { IsValidAccount } from '../../middlewares/account';

const gamingGearControllerInstance: GamingGearController = new GamingGearController();

const router = express.Router();

router.get('/', gamingGearControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN]), gamingGearControllerInstance.createOne);

router.route('/:id')
    .get(gamingGearControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), gamingGearControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), gamingGearControllerInstance.deleteById);

// payment
// router.post('/:id/amount/pay', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractPaymentAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.DRAFTED], paymentPaid: false }), gamingGearControllerInstance.pay);

// verify payment
// router.put('/:id/amount/verify', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), gamingGearControllerInstance.updatePaymentStatus(ContractPaymentStatus.VERIFIEID));
// router.put('/:id/amount/reject', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), gamingGearControllerInstance.updatePaymentStatus(ContractPaymentStatus.REJECTED));


// feedback
// router.post('/:id/feedback/contractor', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.COMPLETED] }), gamingGearControllerInstance.addFeedback("contractee"));
// router.post('/:id/feedback/contractee', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: false, allowContractor: true, status: [ContractStatus.COMPLETED] }), gamingGearControllerInstance.addFeedback("contractor"));

export default router;