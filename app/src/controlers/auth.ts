import path from 'path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { IController } from '../interfaces/interface_controlers.ts';
import { HttpCode, TEMPLATES_DIR } from '../config/constants.ts';
import { readJWT } from '../utils/createJWT.ts';
import { updatePassword } from '../services/auth.ts';

export const createPasswordCtr: IController = async (req, res) => {
  console.log('create password');

  const createPasswordTemplatePath = path.join(TEMPLATES_DIR, 'create-password-page.html');
  const templateSource = (await fs.readFile(createPasswordTemplatePath)).toString();
  const template = handlebars.compile(templateSource);
  const html = template({});

  res.status(HttpCode.OK).send(html);
};

export const updatePasswordCtr: IController = async (req, res) => {
  const { params, body } = req;

  const { sub } = readJWT(params.token);

  const data = (await updatePassword(sub, body.password)) as unknown as { name: string } | null;

  const createTemplatePath = path.join(
    TEMPLATES_DIR,
    !data ? 'create-password-bad-request.html' : 'create-password-correct.html'
  );
  const templateSource = (await fs.readFile(createTemplatePath)).toString();
  const template = handlebars.compile(templateSource);
  // TODO: create link on sign in page
  const html = template(!data ? {} : { name: data.name, link: '#' });

  res.status(!data ? HttpCode.BAD_REQUEST : HttpCode.CREATED).send(html);
};
