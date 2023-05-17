import nodemailer from 'nodemailer';
import config from 'config';
import pug from 'pug';
import { convert } from 'html-to-text';
import Logger from '../logger.util';
import { IEmailUserInfo } from '../../types'

const smtp = config.get<{
    host: string;
    port: number;
    user: string;
    pass: string;
}>('smtp');

export class EmailHelper {
    name: string;
    to: string;
    from: string;

    constructor(public userInfo: IEmailUserInfo) {
        this.name = userInfo.name;
        this.to = userInfo.email;
        this.from = `Contract.PK <${smtp.user}>`;
    }

    // Create a transport and return it
    protected newTransport() {
        return nodemailer.createTransport({
            ...smtp,
            auth: {
                user: smtp.user,
                pass: smtp.pass,
            },
        });
    }

    // Send the actual email
    public async send(template: string, subject: string, url: string) {

        const html = pug.renderFile(`${__dirname}/../../views/${template}.pug`, {
            name: this.name,
            subject,
            url: url,
        });
        // Create mailOptions
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: convert(html),
            html,
        };

        // Send email
        const info = await this.newTransport().sendMail(mailOptions);
        Logger.log(nodemailer.getTestMessageUrl(info));
    }
}
