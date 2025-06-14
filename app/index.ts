import { startServer } from './src/server.ts';
import { initMongoDB } from './src/db/initMongoDB.ts';
import { createDiirIfNotExist } from './src/utils/createDirIfNotExist.ts';
import { TMP_UPLOAD_DIR } from './src/config/constants.ts';
import { createSuperUser } from './src/utils/createSuperUser.ts';
import { oncePerDay } from './src/utils/oncePerDay.ts';

const bootstrap = async () => {
  // conect  to DB
  await initMongoDB();
  // // create dirs for upload files
  await createDiirIfNotExist(TMP_UPLOAD_DIR);
  // create user for sign in to dmin panel
  await createSuperUser();
  // once per day make some
  oncePerDay();
  // // start server
  return startServer();
};

export default await bootstrap();
