import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { APP_DOMAIN, AUTH_EMAIL, AUTH_EMAIL_PASSWORD, TEMPLATES_DIR } from '../config/constants.ts';
import nodemailer from 'nodemailer';
import { createJWT } from './createJWT.ts';

const connfigNodeMailer = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_EMAIL_PASSWORD,
  },
};

export const sendAuthMAil = async (superUserEmail: string, name: string = 'Delulu') => {
  const token = await createJWT(superUserEmail);
  // `${APP_DOMAIN}create-password/${token}`
  const link = new URL(APP_DOMAIN + 'auth' + '/' + 'create-password' + '/' + token);

  const createPasswordTemplatePath = path.join(TEMPLATES_DIR, 'create-password-email.html');
  const templateSource = (await fs.readFile(createPasswordTemplatePath)).toString();
  const template = handlebars.compile(templateSource);
  const html = template({ name, link });

  const transporter = nodemailer.createTransport(connfigNodeMailer);

  const emailOptionst = {
    from: AUTH_EMAIL,
    to: superUserEmail,
    subject: 'Autintificate superuser email',
    html,
  };

  await transporter
    .sendMail(emailOptionst)
    .then(info => console.log(info))
    .catch(err => console.log(err));
};

export const sendContactMail = async ({
  name,
  email,
  text,
  superUserEmail,
}: {
  name: string;
  email: string;
  text: string;
  superUserEmail: string;
}): Promise<void> => {
  const createTemplate = path.join(TEMPLATES_DIR, 'contact-email.hbs');
  const templateSource = (await fs.readFile(createTemplate)).toString();
  const template = handlebars.compile(templateSource);
  const html = template({ name, email, text });

  const transporter = nodemailer.createTransport(connfigNodeMailer);
  const emailOptionst = {
    from: AUTH_EMAIL,
    to: superUserEmail,
    sudject: `${name} try to conect with you`,
    html,
  };

  await transporter.sendMail(emailOptionst).catch(err => console.log(err));
};
