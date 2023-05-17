import express from 'express';
import { AccountRole } from '../../types/enums';
import { OrderController } from '../../controllers/order';
import { IsValidAccount } from '../../middlewares/account';

const orderControllerInstance: OrderController = new OrderController();

const router = express.Router();

router.get('/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), orderControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), orderControllerInstance.createOne);
router.get('/user/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), orderControllerInstance.findByUser);
router.get('/:id/approve', orderControllerInstance.orderPaid)

router.route('/:id')
    .get(IsValidAccount([AccountRole.USER, AccountRole.ADMIN]), orderControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), orderControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), orderControllerInstance.deleteById);


// payment
// router.post('/:id/amount/pay', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractPaymentAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.DRAFTED], paymentPaid: false }), orderControllerInstance.pay);

// verify payment
// router.put('/:id/amount/verify', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), orderControllerInstance.updatePaymentStatus(ContractPaymentStatus.VERIFIEID));
// router.put('/:id/amount/reject', IsValidAccount([AccountRole.ADMIN], AccountStatus.ACTIVE), validate(contractPaymentVerifySchema), IsValidContract({ allowContractee: false, allowContractor: false, status: [ContractStatus.DRAFTED], paymentStatus: [ContractPaymentStatus.UNVERIFIED] }), orderControllerInstance.updatePaymentStatus(ContractPaymentStatus.REJECTED));


// feedback
// router.post('/:id/feedback/contractor', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: true, allowContractor: false, status: [ContractStatus.COMPLETED] }), orderControllerInstance.addFeedback("contractee"));
// router.post('/:id/feedback/contractee', IsValidAccount([AccountRole.USER], AccountStatus.ACTIVE), validate(contractFeedbackAddSchema), IsValidContract({ allowContractee: false, allowContractor: true, status: [ContractStatus.COMPLETED] }), orderControllerInstance.addFeedback("contractor"));

export default router;