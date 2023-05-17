import express from 'express';
import { AccountRole } from "../types/enums";

import { IsValidAccount } from '../middlewares/account';
import { FavoriteProductsController } from '../controllers/favorite-products.controller';


const favoriteProductsControllerInstance = new FavoriteProductsController();

const router = express.Router();

router.get('/', favoriteProductsControllerInstance.findMany);
router.post('/', IsValidAccount([AccountRole.ADMIN, AccountRole.USER]), favoriteProductsControllerInstance.createOne);

router.route('/:id')
    .get(IsValidAccount([AccountRole.USER, AccountRole.ADMIN]), favoriteProductsControllerInstance.findById)
    .put(IsValidAccount([AccountRole.ADMIN]), favoriteProductsControllerInstance.updateById)
    .delete(IsValidAccount([AccountRole.ADMIN]), favoriteProductsControllerInstance.deleteById);

export default router;