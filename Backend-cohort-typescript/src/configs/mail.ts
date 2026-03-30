// Nodemailer config file
import { createTransport } from "nodemailer"
export const transporter = createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

