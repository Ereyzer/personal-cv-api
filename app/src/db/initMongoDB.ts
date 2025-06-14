import mongoose from 'mongoose';

import { MONGO_URL, NODE_ENV } from '../config/constants.ts';

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    if (NODE_ENV === 'dev') {
      console.log('Mongo connection successfully established!');
    }
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
