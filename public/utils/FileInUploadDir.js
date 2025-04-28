import fs from 'node:fs/promises';
import path from 'node:path';
import { TMP_UPLOAD_DIR, UPLOAD_DIR } from "../config/constants.js";
import { getEnvVar } from "./getEnvVar.js";
export const saveFileToUploadDir = async (fileName) => {
    const pathToTMPFile = path.join(TMP_UPLOAD_DIR, fileName);
    const pathToNewFile = path.join(UPLOAD_DIR, fileName);
    await fs.rename(pathToTMPFile, pathToNewFile);
    await fs.access(pathToNewFile);
    return `${getEnvVar('APP_DOMAIN')}/uploads/${fileName}`;
};
export const rmFileFromUploadDir = async (url) => {
    const fileName = path.basename(url);
    const patToFile = path.join(UPLOAD_DIR, fileName);
    try {
        await fs.access(patToFile);
        fs.rm(patToFile);
    }
    catch (error) {
        if (error instanceof Error && error.code === 'ENOENT')
            return;
    }
};
