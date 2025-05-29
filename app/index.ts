import { startServer } from './src/server.ts';
import { initMongoDB } from './src/db/initMongoDB.ts';
import { createDiirIfNotExist } from './src/utils/createDirIfNotExist.ts';
import {
  TMP_UPLOAD_DIR,
  // UPLOAD_DIR
} from './src/config/constants.ts';

const bootstrap = async () => {
  // conect  to DB
  await initMongoDB();
  // // create dirs for upload files
  await createDiirIfNotExist(TMP_UPLOAD_DIR);
  // await createDiirIfNotExist(UPLOAD_DIR);
  // // start server
  return startServer();
};

export default await bootstrap();
