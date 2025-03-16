import { startServer } from './server.ts';
import { initMongoDB } from './db/initMongoDB.ts';
import { createDiirIfNotExist } from './utils/createDirIfNotExist.ts';
import { TMP_UPLOAD_DIR, UPLOAD_DIR } from './config/constants.ts';

const bootstrap = async () => {
  // conect  to DB
  await initMongoDB();
  // // create dirs for upload files
  await createDiirIfNotExist(TMP_UPLOAD_DIR);
  await createDiirIfNotExist(UPLOAD_DIR);
  // // start server
  startServer();
};

bootstrap();
