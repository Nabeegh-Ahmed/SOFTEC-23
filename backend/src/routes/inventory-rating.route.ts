import express from 'express';
import { AccountRole } from "../types/enums";

import { IsValidAccount } from '../middlewares/account';
import { InventoryRatingController } from '../controllers/inventory-rating.controller';


const inventoryRatingControllerInstance = new InventoryRatingController();

const router = express.Router();

router.get('/', inventoryRatingControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.USER]), inventoryRatingControllerInstance.createOne);

router.route('/:id')
    .get(IsValidAccount([AccountRole.USER, AccountRole.ADMIN]), inventoryRatingControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), inventoryRatingControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), inventoryRatingControllerInstance.deleteById);

export default router;