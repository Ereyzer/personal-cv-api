import fs from 'fs';
import path from 'path';

import express from 'express';
import { getEnvVar } from './utils/getEnvVar';
import swaggerUi from 'swagger-ui-express';

import AdminRouter from './routers/admin';
import { __dirname } from './config/constants';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './config/err-const';

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger/swagger.json'), 'utf8')
);

const PORT: number = Number(getEnvVar('APP_PORT', '3001'));
const HOST: string = getEnvVar('APP_HOST', 'localhost');

export const startServer = () => {
  const app = express();
  app.use(express.json());
  //   // TODO: CORS !!!!!
  //   // TODO: some logs???

  app.get('/', async (_req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

  app.use(AdminRouter);
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('*', req => {
    const url: string = `${req.protocol}//${req.get('host')}${req.originalUrl}`;

    throw new NotFoundError(`Wrong url: ${url}`);
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port: http://${HOST}:${PORT}`);
  });
};
