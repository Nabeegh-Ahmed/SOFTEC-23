import { IEmailUserInfo } from '../../types';
import { EmailHelper } from './base-email.util';


export class AccountEmailHelper extends EmailHelper {
    constructor(public userInfo: IEmailUserInfo) {
        super(userInfo);
    }

    // send reset password email
    public async sendResetPassword(url: string) {
        await this.send('resetPassword', 'Reset your password (valid for only 10 minutes)', url);
    }

    // send email verification email
    public async sendEmailVerificationCode(url: string) {
        await this.send('verificationCode', 'Verify your email address (valid for 1 day)', url);
    }
}
