import { Router } from "express";

import authRouter from "./auth";
import userRouter from "./user.route";
import videoGameRouter from "./inventory/video_game.route";
import gamingGearRouter from "./inventory/gaming_gear.route";
import orderRouter from "./order/order.route";
import inventoryRouter from "./inventory-rating.route";
import favoriteProductsRouter from "./favorite-products.route";
import disputeRouter from "./dispute.route";
import disputeMessageRouter from "./dispute-message.route";
import { SetContext } from "../middlewares/setContext.middleware";

const router = Router();

router.use(SetContext);

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/inventory/video-games", videoGameRouter);
router.use("/inventory/gaming-gears", gamingGearRouter);
router.use("/orders", orderRouter);
router.use("/inventory-ratings/", inventoryRouter);
router.use("/favorite-products/", favoriteProductsRouter);
router.use("/disputes/", disputeRouter);
router.use("/dispute-messages/", disputeMessageRouter);

export default router;
