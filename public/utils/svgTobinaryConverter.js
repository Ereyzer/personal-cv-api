import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'path';
import { TMP_UPLOAD_DIR } from "../config/constants.js";
export const fromSvgToBinary = async (path) => {
    const buffer = await readFile(path);
    rm(path);
    return buffer;
};
export const fromBinaryToSvg = async (file) => {
    const pathToFile = path.join(TMP_UPLOAD_DIR, file.name);
    await writeFile(pathToFile, file.buffer, 'utf-8');
    return pathToFile;
};
export const rmTmpFile = async (filePath) => {
    rm(filePath);
};
