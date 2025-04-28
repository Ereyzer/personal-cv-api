import fs from 'node:fs/promises';
export class SvgConverter {
    constructor() { }
    async #readFile(fPath) {
        try {
            return await fs.readFile(fPath);
        }
        catch (e) {
            console.error('readSvgDir:', e);
            if (e instanceof Error) {
                throw new Error(e.message); // Зберігаємо початкове повідомлення
            }
            throw new Error('Unknown error occurred');
        }
    }
    async toBinary(fPath) {
        const buffer = await this.#readFile(fPath);
        const file = JSON.stringify(buffer);
        return file;
    }
    toSvg() { }
}
