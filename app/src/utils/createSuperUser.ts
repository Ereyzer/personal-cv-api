import { registerUser } from '../services/auth.ts';
import { sendAuthMAil } from './sendMail.ts';
import { SUPERUSER_EMAIL as email, SUPERUSER_PASSWORD as password } from '../config/constants.ts';
import { crypter } from './crypter.ts';

export const createSuperUser = async (): Promise<void> => {
  try {
    await registerUser({ email, password: await crypter.encryptHash(password) });
    await sendAuthMAil(email);

    console.log('superuser created');
  } catch (error) {
    if ((error as unknown as { code: number })?.code === 11000) {
      console.log('superuser already exist');
      return;
    }
    console.log(error);
    return;
  }
};
