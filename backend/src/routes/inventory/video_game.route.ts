import express from 'express';
import { AccountRole } from '../../types/enums';
import { VideoGameController } from '../../controllers/inventory';
import { IsValidAccount } from '../../middlewares/account';

const videoGameControllerInstance: VideoGameController = new VideoGameController();

const router = express.Router();

router.get('/', videoGameControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN]), videoGameControllerInstance.createOne);

router.route('/:id')
    .get(videoGameControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), videoGameControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), videoGameControllerInstance.deleteById);

// payment
// router.post('/:id/amount/pay', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractPaymentAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.DRAFTED], paymentPaid: false }), videoGameControllerInstance.pay);

// verify payment
// router.put('/:id/amount/verify', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), videoGameControllerInstance.updatePaymentStatus(ContractPaymentStatus.VERIFIEID));
// router.put('/:id/amount/reject', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), videoGameControllerInstance.updatePaymentStatus(ContractPaymentStatus.REJECTED));


// feedback
// router.post('/:id/feedback/contractor', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.COMPLETED] }), videoGameControllerInstance.addFeedback("contractee"));
// router.post('/:id/feedback/contractee', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: false, allowContractor: true, status: [ContractStatus.COMPLETED] }), videoGameControllerInstance.addFeedback("contractor"));

export default router;