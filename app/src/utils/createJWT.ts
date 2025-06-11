import jwt from 'jsonwebtoken';

import { NotFoundError, UnauthorizedError } from '../config/err-const.ts';
import { getUser } from '../services/auth.ts';
import { JWT_SECRET } from '../config/constants.ts';

export const createJWT = async (email: string): Promise<string> => {
  const user = await getUser(email);
  if (!user) {
    throw new NotFoundError(`user with ${email}: not found`);
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email,
      date: Date.now(),
    },
    JWT_SECRET
  );
  console.log(token);

  return token;
};

export const readJWT = <R = { sub: string; email: string; date: number; iat: number }>(
  token: string
): R => {
  try {
    const entries = jwt.verify(token, JWT_SECRET);
    return entries as unknown as R;
  } catch (error) {
    console.log(error);

    throw new UnauthorizedError((error as unknown as Error).message);
  }
};
