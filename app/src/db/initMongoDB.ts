import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.ts';
import { NODE_ENV, varsEnv } from '../config/constants.ts';

export const initMongoDB = async () => {
  try {
    // const mongo = getEnvVar(varsEnv.MONGODB);
    // const user = getEnvVar(varsEnv.MONGODB_USER);
    // const pwd = getEnvVar(varsEnv.MONGODB_PASSWORD);
    // const host = getEnvVar(varsEnv.MONGODB_HOST);
    // const port = getEnvVar(varsEnv.MONGODB_PORT);
    // const db = getEnvVar(varsEnv.MONGODB_DB);

    const url = getEnvVar(varsEnv.MONGODB_URL);

    // await mongoose.connect(`${mongo}${host}:${port}/${db}`);
    await mongoose.connect(url);
    if (NODE_ENV === 'dev') {
      console.log('Mongo connection successfully established!');
    }
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
