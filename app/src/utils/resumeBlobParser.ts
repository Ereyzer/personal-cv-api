import fs from 'node:fs/promises';
import { TMP_UPLOAD_DIR } from '../config/constants.ts';
import path from 'node:path';

export const fromFileToBlob = async (filePath: string): Promise<Buffer<ArrayBufferLike>> => {
  const buffer = await fs.readFile(filePath);

  return buffer;
};

export const clearTmpFile = (filePath: string): void => {
  fs.rm(filePath);
};

export const fromBlobToFile = async (
  buffer: Buffer<ArrayBufferLike>,
  name: string
): Promise<string> => {
  const tmp = TMP_UPLOAD_DIR;
  const filename = `${Date.now()}_${name}`;
  const filePath = path.join(tmp, filename);
  await fs.writeFile(filePath, buffer);
  return filePath;
};
