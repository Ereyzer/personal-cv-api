import { startServer } from './server';
import { initMongoDB } from './db/initMongoDB';
import { createDiirIfNotExist } from './utils/createDirIfNotExist';
import { TMP_UPLOAD_DIR, UPLOAD_DIR } from './config/constants';

const bootstrap = async () => {
  // conect  to DB
  await initMongoDB();
  // create dirs for upload files
  await createDiirIfNotExist(TMP_UPLOAD_DIR);
  await createDiirIfNotExist(UPLOAD_DIR);
  // start server
  startServer();
};

bootstrap();
