import nodemailer from "nodemailer"

const credientials = {
    host:process.env.SMTP_HOST,
    post:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_AUTH_USER,
        pass:process.env.SMTP_AUTH_PASS
    }
}

export const transporter = nodemailer.createTransport(credientials)