import fs from 'node:fs/promises';
export const createDiirIfNotExist = async (path) => {
    try {
        await fs.access(path);
    }
    catch (error) {
        if (error instanceof Error && error.code === 'ENOENT')
            await fs.mkdir(path);
    }
};
