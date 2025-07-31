import fs from 'node:fs/promises';

export const createDiirIfNotExist = async (tmpPathString: string) => {
  try {
    await fs.access(tmpPathString);

    console.log('is dir');
    console.log(tmpPathString);
    await fs.writeFile(tmpPathString + '/test.txt', 'Hello World');
    console.log(await fs.readFile(tmpPathString + '/test.txt', { encoding: 'utf-8' }));
  } catch (error) {
    console.log(error);

    if (error instanceof Error && (error as { code?: string }).code === 'ENOENT')
      await fs.mkdir(tmpPathString);
    console.log('create dir');
  }
};
