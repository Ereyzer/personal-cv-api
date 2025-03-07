import fs from 'node:fs/promises';
import path from 'node:path';

import { TMP_UPLOAD_DIR, UPLOAD_DIR } from '../config/constants';
import { getEnvVar } from './getEnvVar';

export const saveFileToUploadDir = async (fileName: string): Promise<string | never> => {
  const pathToTMPFile: string = path.join(TMP_UPLOAD_DIR, fileName);
  const pathToNewFile: string = path.join(UPLOAD_DIR, fileName);
  await fs.rename(pathToTMPFile, pathToNewFile);

  await fs.access(pathToNewFile);

  return `${getEnvVar('APP_DOMAIN')}/uploads/${fileName}`;
};

export const rmFileFromUploadDir = async (url: string): Promise<void> => {
  const fileName: string = path.basename(url);
  const patToFile: string = path.join(UPLOAD_DIR, fileName);
  try {
    await fs.access(patToFile);
    fs.rm(patToFile);
  } catch (error) {
    if (error instanceof Error && (error as { code?: string }).code === 'ENOENT') return;
  }
};
