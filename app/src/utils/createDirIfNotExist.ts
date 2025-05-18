import fs from 'node:fs/promises';
import path from 'node:path';

// import { pathToSwaggerUi } from '../server.ts';

export const createDiirIfNotExist = async (tmpPathString: string) => {
  try {
    // console.log(tmpPathString);

    // console.log(path.join(path.dirname(tmpPathString), '../'));

    console.log(await fs.readdir('/var/task'));
    console.log(await fs.readdir('/var/task/app'));
    console.log(await fs.readdir('/var/task/app/src'));
    console.log(await fs.readdir('/var/task/app/src/swagger'));

    console.log(await fs.readdir('/var/task/app/src/swagger/swagger-ui-dist'));
    // console.log(await fs.readdir('/var/task/public'));

    // console.log(await fs.readdir(pathToSwaggerUi));

    await fs.access(path.join(path.dirname(tmpPathString), 'swagger'));
    console.log('is dir');

    // await fs.access(tmpPathString);
  } catch (error) {
    if (error instanceof Error && (error as { code?: string }).code === 'ENOENT')
      // await fs.mkdir(tmpPathString);
      console.log('no dir');
  }
};
