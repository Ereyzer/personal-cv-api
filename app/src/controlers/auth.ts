import path from 'path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { IController } from '../interfaces/interface_controlers.ts';
import { HttpCode, TEMPLATES_DIR } from '../config/constants.ts';
import { readJWT } from '../utils/createJWT.ts';
import { getUser, logoutUser, updatePassword } from '../services/auth.ts';
import { crypter } from '../utils/crypter.ts';
import { UnauthorizedError } from '../config/err-const.ts';
import { createCoupleOfTokens, refreshUserSession } from '../services/session.ts';
import { Response } from 'express';

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

  const data = (await updatePassword(sub, await crypter.encryptHash(body.password))) as unknown as {
    name: string;
  } | null;

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

const setupCookieSession = (
  res: Response,
  {
    _id,
    refreshToken,
    refreshTokenValidUntil,
  }: { _id: string; refreshToken: string; refreshTokenValidUntil: Date }
): void => {
  if (!res?.cookie) return;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const loginUserCtr: IController = async (req, res) => {
  const { email, password } = req.body;
  const errMessage = 'Wrong email or password';
  const user = (await getUser(email)) as unknown as { _id: string; password: string };

  if (!user) throw new UnauthorizedError(errMessage);

  const isEqual = await crypter.compareHash(user.password, password);

  if (!isEqual) throw new UnauthorizedError(errMessage);

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } = (await createCoupleOfTokens(
    user._id
  )) as unknown as {
    _id: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenValidUntil: Date;
  };
  setupCookieSession(res, { _id, refreshToken, refreshTokenValidUntil });

  res.status(HttpCode.OK).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken },
  });
};

export const logoutUserCtr: IController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logoutUser(sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(HttpCode.NO_CONTENT).send();
};

export const refreshUserSessionCtr: IController = async (req, res) => {
  const { sessionId, refreshToken: oldToken } = req.cookies;
  const session = await refreshUserSession(sessionId, oldToken);

  if (!session) throw new UnauthorizedError('can not made new session');
  const { _id, refreshToken, refreshTokenValidUntil, accessToken } = session.toJSON();

  setupCookieSession(res, { _id, refreshToken, refreshTokenValidUntil });

  res.status(HttpCode.OK).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken },
  });
};
