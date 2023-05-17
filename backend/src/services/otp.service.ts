import config from "config";
import axios from "axios";
import Logger from "../utils/logger.util";
import { UserOTPStatus, UserPhoneNumberStatus } from "../types";
import AppError from "../utils/error.util";
import { APP_MESSAGES } from "../languages";

const apiUrl = config.get<string>("phoneVerificationApi.url") + "/phoneNumber/otp";
const signature = config.get<string>("phoneVerificationApi.signature");

// to verify the request is coming from our server
const headers = {
    "x-signature": signature,
}

export class OTPService {
    sendOTP = async (countryCode: string, number: string) => {
        const endpoint = `${apiUrl}/send`;

        try {
            const response = await axios.post(endpoint,
                {
                    countryCode,
                    number,
                },
                { headers }
            );
            return response.data.data as { status: UserOTPStatus };
        }
        catch (err: any) {
            Logger.error(err);
            throw new AppError(APP_MESSAGES.ACCOUNT.OTP_SENT_FAILED, 500)
        }
    };

    verifyOTP = async (countryCode: string, number: string, otp: string) => {
        const endpoint = `${apiUrl}/verify`;
        try {
            const response = await axios.post(endpoint,
                {
                    countryCode,
                    number,
                    verificationCode: otp,
                },
                { headers, }
            );

            return response.data.data as { status: UserPhoneNumberStatus };
        }
        catch (err: any) {
            Logger.error(err);
            throw new AppError(APP_MESSAGES.ACCOUNT.PHONE_NUMBER_VERIFICATION_FAILED, 500)
        }
    };
}


