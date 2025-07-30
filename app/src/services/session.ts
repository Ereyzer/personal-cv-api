import { randomBytes } from 'crypto';
import { SessionsCollection } from '../db/models/sessions.ts';
import { FIFTEEN_MINUTES, ONE_DAY } from '../config/constants.ts';
import mongoose from 'mongoose';
import { UnauthorizedError } from '../config/err-const.ts';

export const createCoupleOfTokens = async (userId: string): Promise<mongoose.Document | null> => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const cleearExpiredTokens = async (): Promise<void> => {
  const sessions = await SessionsCollection.find({ refreshTokenValidUntil: { $lt: Date.now() } });
  if (sessions.length === 0) return;
  const sessionIds = (sessions as unknown[] as { _id: string }[]).map(({ _id }) => _id);
  await SessionsCollection.deleteMany({ _id: sessionIds });
  return;
};

export const closeSession = async (_id: string): Promise<mongoose.DeleteResult> => {
  return await SessionsCollection.deleteOne({ _id });
};

export const getSession = async (payload: object): Promise<mongoose.Document | null> => {
  return await SessionsCollection.findOne({ ...payload });
};

export const checkRefreshToken = async (
  sessionId: string,
  token: string
): Promise<mongoose.Document | null> => {
  const session = await getSession({ _id: sessionId });
  if (!session) return null;
  const { refreshToken, refreshTokenValidUntil } = session.toJSON();
  if (refreshToken !== token) return null;

  if (!refreshTokenValidUntil || refreshTokenValidUntil.getTime() < Date.now()) return null;
  return session;
};

export const checkAccessToken = async (accessToken: string): Promise<{ userId: string }> => {
  const session = await getSession({ accessToken });
  if (!session) throw new UnauthorizedError('Session not found');
  const { userId, accessTokenValidUntil } = session.toJSON();
  if (accessTokenValidUntil.getTime() < Date.now())
    throw new UnauthorizedError('Access token expired');
  return { userId };
};

export const refreshUserSession = async (
  sessionId: string,
  refreshToken: string
): Promise<mongoose.Document | null> => {
  const oldSession = await checkRefreshToken(sessionId, refreshToken);
  if (!oldSession) throw new UnauthorizedError('session expired');

  const { _id, userId } = oldSession.toJSON();
  await closeSession(_id);
  return await createCoupleOfTokens(userId);
};
