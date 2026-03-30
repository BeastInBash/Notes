import { transporter } from "../configs/mail.js";

interface IMailProp {
    to: string;
    subject: string;
    html: any;
}
export const sendMail = ({ to, subject, html }: IMailProp) => {
    try {
        const mail = transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html
        })
        return mail;
    } catch (error) {
        console.log(error)
    }

}
