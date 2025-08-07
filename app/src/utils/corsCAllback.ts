import { CorsOptions } from 'cors';
import { ADMIN_DOMAIN, RESUME_DOMAIN } from '../config/constants.ts';

const allowedOrigins = { ADMIN_DOMAIN, RESUME_DOMAIN };

export const corsCallBAck: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return;

    if (Object.values(allowedOrigins).indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed origin'));
    }
  },
  credentials: true,
};
