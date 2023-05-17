export const appMessages = {
	ACCOUNT: {
		UNAUTHORIZED: "Unauthorized",
		FORBIDDEN: "Forbidden",

		LOGIN_FAILED: "Login failed, please provide email or phone number",
		INVALID_LOGIN_CREDENTIALS: "Invalid login credentials",
		LOGGED_IN: "Logged in successfully",

		LOGOUT_SUCCESS: "Logged out successfully",
		LOGOUT_FAILED: "Logout failed",

		SIGNUP_SUCCESS: "Signed up successfully",
		SIGNUP_FAILED: "Signup failed",

		GOOGLE_AUTH_FAILED: "Could not authenticate with google, please try again",
		GOOGLE_ACCOUNT_NOT_VERIFIED:
			"Google account not verified, please verify your account",

		REFRESH_ACCESS_TOKEN_FAILED:
			"Could not refresh access token, please login again",
		REFRESH_ACCESS_TOKEN_SUCCESS: "Access token refreshed successfully",
		REQUIRED_TOKEN: "Token is required",
		INVALID_EXPIRED_TOKEN: "Token is invalid or has expired",
		SESSION_EXPIRED: "User session has expired",
		TOKEN_NO_LONGER_EXISTS: "User with that token no longer exist",

		PASSWORD_RESET_SUCCESS:
			"Password reset successfully, you can now login with your new password",
		PASSWORD_RESET_EMAIL_SENT:
			"Password reset email sent, please check your email",
		PASSWORD_RESET_CODE_EXPIRED:
			"Password reset code expired, please try again",
		PASSWORD_RESET_FAILED: "Password reset failed, please try again",

		NOT_FOUND: "User not found",

		EMAIL_ALREADY_EXISTS: "User already exists",
		EMAIL_NOT_VERIFIED:
			"You are not verified, check your email to verify your account",
		EMAIL_VERIFICATION_FAILED: "Could not verify email, please try again",
		EMAIL_VERIFIED: "Email verified successfully",
		EMAIL_VERIFICATION_CODE_SENT:
			"A verification code has been sent to your email",
		EMAIL_VERIFICATION_CODE_EXPIRED:
			"Email verification code expired, please try again",
		EMAIL_SENDING_ERROR: "There was an error sending email, please try again",
		INVALID_EMAIL_PASSWORD: "Invalid email or password",
		EMAIL_ALREADY_VERIFIED: "Your email is already verified",

		NOT_LOGIN: "You are not logged in",
		NOT_ACTIVE: "Sorry, your account is not active, please contact admin",
		ACTIVE: "Sorry, your account is active, please contact admin",

		OTP_SENT: "OTP sent successfully",
		OTP_EXPIRED: "OTP expired",
		OTP_SENT_FAILED: "Failed to send OTP",
		PHONE_NUMBER_VERIFICATION_FAILED: "Phone number verification failed",
		PHONE_NUMBER_VERIFIED: "Phone number verified successfully",
		PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified",
		PHONE_NUMBER_ALREADY_VERIFIED:
			"Your associated phone number is already verified",
		PHONE_NUMBER_REQUIRED: "Phone number is required",
		PHONE_NUMBER_ALREADY_EXIST: "Phone number already exist",
		PHONE_NUMBER_NOT_EXIST: "Phone number does not exist",

		ID_ALREADY_EXIST: "ID already exist",
		ID_NOT_EXIST: "ID does not exist",
		ID_UPDATED_SUCCESSFULLY: "ID updated successfully",
		ID_VERIFIED_SUCCESSFULLY: "ID verified successfully",
		ID_VERIFICATION_FAILED: "ID verification failed",
		FACE_WITH_ID_UPDATED_SUCCESSFULLY: "Face with ID updated successfully",
		FACE_WITH_ID_VERIFICATION_FAILED: "Face with ID verification failed",
		ID_NOT_VERIFIED: "ID not verified",
		ID_ALREADY_VERIFIED: "ID already verified",
	},

	NOT_AUTHORIZED: "You are not authorized to perform this action",
	FORBIDDEN: "Forbidden",
};

export type IAppMessages = typeof appMessages;
