import nodemailer from 'nodemailer'
import env from '../env'

export default async (toEmail: string, subject: string, message: string)=>{
    const transporter = nodemailer.createTransport({
        host: env.emailHost,
        port: env.emailPort,
        secure: false, // true for 465, false for other ports
        auth: {
            user: env.emailUser,
            pass: env.emailPassword
        },
    });
    const info = await transporter.sendMail({
        from: '"James Pico 👻" <foo@example.com>', // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>${message}</b>`, // html body
    });
}