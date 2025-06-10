// import fs from 'fs';
// import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import router from './routers/index.ts';

import {
  // DIR_NAME,
  HOST,
  // NODE_ENV,
  PORT,
  // UPLOAD_DIR
} from './config/constants.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import { NotFoundError } from './config/err-const.ts';
// import { ctrlWrapper } from './utils/ctrlWrapper.ts';
// import { getAllIcons } from './services/icon';
import swaggerFile from './swagger/swagger.ts';

// const swaggerDocument = JSON.parse(
//   fs.readFileSync(path.join(DIR_NAME, 'swagger/swagger.json'), 'utf8')
// );

const swaggerDocument = JSON.parse(swaggerFile);

export const startServer = () => {
  const app = express();
  app.use(express.json());
  //   // TODO: CORS !!!!!
  //   // TODO: some logs???

  app.get('/hello', async (_req, res) => {
    const message = 'Hello World';
    // const data = await getAllIcons();
    // res.status(200).contentType('aplication/json').send({ message });
    console.log(message);

    res.send(message);
  });

  // app.use('/admin/page', ctrlWrapper(express.static('/static')));
  app.use(router);
  // SWAGGER

  // app.use(
  //   (req, res, next) => {
  //     console.log(DIR_NAME);

  //     next();
  //   },
  //   express.static(path.join(DIR_NAME, 'static'))
  // );
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // WRONG url
  app.use('*', req => {
    const url: string = `${req.protocol}//${req.get('host')}${req.originalUrl}`;

    throw new NotFoundError(`Wrong url: ${url}`);
  });

  // ERRORS
  app.use(errorHandler);

  app.listen(PORT, () => {
    // if (NODE_ENV === 'dev') {
    console.log(`Server is running on port: http://${HOST}:${PORT}`);
    // }
  });

  return app;
};
