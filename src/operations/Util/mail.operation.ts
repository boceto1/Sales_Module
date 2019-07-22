import * as nodemailer from "nodemailer";
import config from '../../configs/configs';
import { Mail } from '../../types/types';

export const createMailCtrl = (email: Mail) => {
    let mailOptions = {
        from: config.user,
        to: email.to,
        subject: email.subject,
        html: email.html,
        attachments: email.attachments
    };
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: false,
        auth: {
            user: config.user,
            pass: config.password
        },
        tls: { rejectUnauthorized: false }
    });


    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            return error;
        } else {
            return "E-mail enviado com sucesso!";
        }
    });
};