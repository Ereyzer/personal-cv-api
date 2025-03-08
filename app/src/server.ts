import fs from 'fs';
import path from 'path';

import express from 'express';
import { getEnvVar } from './utils/getEnvVar';
import swaggerUi from 'swagger-ui-express';

import AdminRouter from './routers/admin';
import { __dirname, UPLOAD_DIR } from './config/constants';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './config/err-const';
import { ctrlWrapper } from './utils/ctrlWrapper';

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
    const message = 'Hello World';
    res.status(200).contentType('aplication/json').send({ message });
  });

  app.use('/uploads', ctrlWrapper(express.static(UPLOAD_DIR)));
  app.use(AdminRouter);
  // SWAGGER
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // WRONG url
  app.use('*', req => {
    const url: string = `${req.protocol}//${req.get('host')}${req.originalUrl}`;

    throw new NotFoundError(`Wrong url: ${url}`);
  });

  // ERRORS
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port: http://${HOST}:${PORT}`);
  });
};
