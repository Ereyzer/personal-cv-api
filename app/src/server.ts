import fs from 'fs';
import path from 'path';

import express, { Request, Response } from 'express';
import { getEnvVar } from './untils/getEnvVar';
import swaggerUi from 'swagger-ui-express';

import AdminRouter from './routers/admin';
import { HttpCode, __dirname } from './config/constants';

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

  app.get('/', async (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

  app.use(AdminRouter);
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('*', (req, res) => {
    res.status(HttpCode.NOT_FOUND).json({
      message: 'not Found!',
    });
  });

  app.use((err: Error, req: Request, res: Response) => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: 'Somsing went WRONG!!!',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: http://${HOST}:${PORT}`);
  });
  // console.log();
};
