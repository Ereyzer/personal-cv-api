import bcrypt from 'bcrypt';

import { SALT_ROUNDS_HASH } from '../config/constants.ts';

export const crypter = {
  encryptHash: async (password: string): Promise<string> =>
    await bcrypt.hash(password, Number(SALT_ROUNDS_HASH)),
  compareHash: async (passwordHash: string, password: string) =>
    await bcrypt.compare(password, passwordHash),
};
