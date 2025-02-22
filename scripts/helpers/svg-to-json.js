import path from 'node:path';
import fs from "node:fs/promises";
import mongoose from 'mongoose';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { SvgCOllection } = require('../../tmp/svg.js');


const newFile = process.argv[2];
// const tmp = path.dirname(newFile);
// const locate = path.dirname(`${process.argv[1]}`);

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
        const buffers = await Promise.all(filePaths.map(readSvgFile));
        const jsonBaff = [];
        for (let i = 0; i < buffers.length; i++) {
            jsonBaff[i] = new SvgCOllection({
                "_id": new mongoose.Types.ObjectId(),
                "name": path.basename(filePaths[i]),
                "buffer": JSON.stringify(buffers[i])
            })
        }

        return JSON.stringify(jsonBaff, null, 4);

    } catch (e) {

        console.log('rsvgToJson: ' + e);
    }

}
svgToJson().then(text => {

    fs.writeFile(newFile, text, "utf-8");
})
// console.log(process.argv[3]);

