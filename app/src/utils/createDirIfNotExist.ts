import fs from 'node:fs/promises';

export const createDiirIfNotExist = async (path: string) => {
  try {
    await fs.access(path);
  } catch (error) {
    if (error instanceof Error && (error as { code?: string }).code === 'ENOENT')
      await fs.mkdir(path);
  }
};
