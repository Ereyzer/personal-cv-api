import fs from 'node:fs/promises';

export class SvgConverter {
  constructor() {}

  async #readFile(fPath: string): Promise<Buffer> {
    try {
      return await fs.readFile(fPath);
    } catch (e) {
      console.error('readSvgDir:', e);

      if (e instanceof Error) {
        throw new Error(e.message); // Зберігаємо початкове повідомлення
      }

      throw new Error('Unknown error occurred');
    }
  }
  public async toBinary(fPath: string): Promise<string> {
    const buffer = await this.#readFile(fPath);
    const file = JSON.stringify(buffer);
    return file;
  }

  public toSvg() {}
}
