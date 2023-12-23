
import nodemailer from 'nodemailer';
import config from '../config';







export const sendEmail = async (to:string, html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "ashrafujj.jaman.tanbin@gmail.com",
          pass: "ymnk qfqd hwpg rkxp",
        },
      });
     await transporter.sendMail({
        from: 'ashrafujj.jaman.tanbin', // sender address
        to, // list of receivers
        subject: "Reset Password", // Subject line
        text: 'Reset your password within 10 mins!', // plain text body
        html , // html body
      });
    
      
}