import fs from 'node:fs/promises';

export const createDiirIfNotExist = async (tmpPathString: string) => {
  try {
    await fs.access(tmpPathString);

    console.log('is dir');
  } catch (error) {
    if (error instanceof Error && (error as { code?: string }).code === 'ENOENT')
      await fs.mkdir(tmpPathString);
    console.log('create dir');
  }
};
