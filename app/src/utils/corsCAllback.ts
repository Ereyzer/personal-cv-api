import { CorsOptions } from 'cors';
import { ADMIN_DOMAIN, RESUME_DOMAIN } from '../config/constants.ts';

const allowedOrigins = { ADMIN_DOMAIN, RESUME_DOMAIN };

export const corsCallBAck: CorsOptions = {
  origin: (origin, cb) => {
    console.log('cors');

    console.log('origin', origin);
    if (!origin) return;
    console.log('origin', origin);

    if (Object.values(allowedOrigins).indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed origin'));
    }
  },
  credentials: true,
};
