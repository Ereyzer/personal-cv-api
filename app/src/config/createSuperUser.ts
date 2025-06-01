import { registerUser } from '../services/auth.ts';
import { sendAuthMAil } from '../utils/sendMail.ts';
import { SUPERUSER_EMAIL as email, SUPERUSER_PASSWORD as password } from './constants.ts';

export const createSuperUser = async (): Promise<void> => {
  await sendAuthMAil(email);
  try {
    const user = await registerUser({ email, password });
    console.log(user);
    console.log('superuser created');
  } catch {
    console.log('superuser already exist');
  }
};
