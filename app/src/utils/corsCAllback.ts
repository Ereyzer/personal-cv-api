import { CorsOptions } from 'cors';
import { ADMIN_DOMAIN, APP_DOMAIN, PREWIEV_DOMAIN, RESUME_DOMAIN } from '../config/constants.ts';
import { ForbiddenError } from '../config/err-const.ts';

const allowedOrigins = { ADMIN_DOMAIN, RESUME_DOMAIN, PREWIEV_DOMAIN, APP_DOMAIN };

export const corsCallBAck: CorsOptions = {
  origin: (origin, cb) => {
    // if (!origin) throw new ForbiddenError('CORS policy');
    console.log('test: ', origin);
    console.log('domain: ', APP_DOMAIN);
    console.log(!origin);

    console.log(!origin || Object.values(allowedOrigins).indexOf(origin) !== -1);

    if (!origin || Object.values(allowedOrigins).indexOf(origin) !== -1) {
      console.log('good');

      cb(null, true);
    } else {
      console.log('wtf');

      cb(new ForbiddenError('CORS policy'));
    }
  },
  credentials: true,
};
