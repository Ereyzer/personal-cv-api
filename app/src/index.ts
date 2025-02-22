import { startServer } from './server';
import { initMongoDB } from './db/initMongoDB';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
