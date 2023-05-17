import express from 'express';
import { AccountRole } from "../types/enums";

import { IsValidAccount } from '../middlewares/account';
import { DisputeController } from '../controllers/dispute.controller';

const disputeControllerInstance = new DisputeController();

const router = express.Router();

router.get('/', disputeControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), disputeControllerInstance.createOne);

router.route('/:id')
    .get(IsValidAccount([AccountRole.USER, AccountRole.ADMIN]), disputeControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), disputeControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), disputeControllerInstance.deleteById);

export default router;