import { registerUser } from '../services/auth.ts';
import { sendAuthMAil } from './sendMail.ts';
import { SUPERUSER_EMAIL as email, SUPERUSER_PASSWORD as password } from '../config/constants.ts';

export const createSuperUser = async (): Promise<void> => {
  try {
    await registerUser({ email, password });
    await sendAuthMAil(email);
    console.log('superuser created');
  } catch {
    console.log('superuser already exist');
  }
};
