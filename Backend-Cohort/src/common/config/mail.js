import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendVerificationEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `${process.env.SMTP_FROM_EMAIL}`,
        to,
        subject,
        html
    })
}
export {
    sendVerificationEmail
}
