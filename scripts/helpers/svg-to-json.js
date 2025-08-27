import path from 'node:path';
import fs from 'node:fs/promises';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { IconCOllection } = require('../../tmp/icon.js');

const newFile = process.argv[2];

async function readSvgDir(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    return files.map(f => `${dirPath}/${f}`);
  } catch (e) {
    console.log('readSvgDir: ' + e);
  }
}

async function readSvgFile(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (e) {
    console.log('readSvgFile: ' + e);
  }
}

const svgToJson = async () => {
  try {
    const filePaths = await readSvgDir(process.argv[3]);
    // const buffers = await Promise.all(filePaths.map(readSvgFile));

    const buffers = await Promise.all(filePaths.map(readSvgFile));
    const jsonBaff = [];
    for (let i = 0; i < buffers.length; i++) {
      jsonBaff[i] = new IconCOllection({
        name: path.basename(filePaths[i]),
        buffer: JSON.stringify(buffers[i]),
      });
    }

    return new Buffer(JSON.stringify(jsonBaff));
  } catch (e) {
    console.log('rsvgToJson: ' + e);
  }
};
svgToJson().then(text => {
  fs.writeFile(newFile, text, 'utf-8');
});
// console.log(process.argv[3]);
