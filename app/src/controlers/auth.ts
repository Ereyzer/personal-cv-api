import path from 'path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { IController } from '../interfaces/interface_controlers.ts';
import { TEMPLATES_DIR } from '../config/constants.ts';

export const createPasswordCtr: IController = async (req, res) => {
  console.log('create password');

  const createPasswordTemplatePath = path.join(TEMPLATES_DIR, 'create-password-page.html');
  const templateSource = (await fs.readFile(createPasswordTemplatePath)).toString();
  const template = handlebars.compile(templateSource);
  const html = template({});

  res.status(200).send(html);
};
