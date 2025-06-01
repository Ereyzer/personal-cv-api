import { AUTH_EMAIL, AUTH_EMAIL_PASSWORD } from '../config/constants.ts';
import nodemailer from 'nodemailer';

const connfigNodeMailer = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_EMAIL_PASSWORD,
  },
};

export const sendAuthMAil = async (superUserEmail: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transporter = nodemailer.createTransport(connfigNodeMailer);
  const emailOptionst = {
    from: AUTH_EMAIL,
    to: superUserEmail,
    subject: 'Nodemailer test',
    text: 'Привіт. Ми тестуємо надсилання листів!',
  };
  console.log(emailOptionst);

  // await transporter
  //   .sendMail(emailOptionst)
  //   .then(info => console.log(info))
  //   .catch(err => console.log(err));
};
