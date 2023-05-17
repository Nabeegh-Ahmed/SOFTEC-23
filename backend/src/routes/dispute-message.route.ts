import express from 'express';
import { AccountRole } from "../types/enums";

import { IsValidAccount } from '../middlewares/account';
import { DisputeMessageController } from '../controllers/dispute.controller';

const disputeMessageControllerInstance = new DisputeMessageController();

const router = express.Router();

router.get('/', disputeMessageControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), disputeMessageControllerInstance.createOne);

// router.route('/:id')
//     .get(IsValidAccount([AccountRole.USER, AccountRole.ADMIN]), disputeMessageControllerInstance.findById)
//     .put(IsValidAccount([AccountRole.ADMIN]), disputeMessageControllerInstance.updateById)
    // .delete(IsValidAccount([AccountRole.ADMIN]), disputeMessageControllerInstance.deleteById);

export default router;