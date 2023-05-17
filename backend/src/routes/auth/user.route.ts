import express from "express";

import { validate } from "../../middlewares";
import {
  accountLoginSchema,
  accountVerifyEmailSchema,
  accountForgetPasswordSchema,
  accountResetPasswordSchema,
  accountGoogleLoginSchema,
  userSignupSchema,
} from "../../schema/account";

import { UserAuthController } from "../../controllers/auth/user-auth.controller";
import { AccountRole } from "../../types";
import { IsValidAccount } from "../../middlewares/account";

const UserAuthControllerInstance = new UserAuthController();

const router = express.Router();

// Register user route
router.post("/register", validate(userSignupSchema), UserAuthControllerInstance.signup);


router.post("/login", validate(accountLoginSchema), UserAuthControllerInstance.login);

router.post("/google/login", validate(accountGoogleLoginSchema), UserAuthControllerInstance.googleLogin);

// Logout User
router.get("/logout", IsValidAccount([AccountRole.USER]), UserAuthControllerInstance.logout);

// Verify Email
router.get(
  "/verifyemail/:emailVerificationCode",
  validate(accountVerifyEmailSchema),
  UserAuthControllerInstance.verifyEmail
);

// Forgot Password
router.post("/forgotpassword", validate(accountForgetPasswordSchema), UserAuthControllerInstance.forgotPassword);

// Reset Password
router.patch("/resetpassword/:code", validate(accountResetPasswordSchema), UserAuthControllerInstance.resetPassword);

export default router;