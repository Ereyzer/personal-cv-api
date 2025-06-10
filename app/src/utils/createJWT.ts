import jwt from 'jsonwebtoken';

import { NotFoundError } from '../config/err-const.ts';
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
