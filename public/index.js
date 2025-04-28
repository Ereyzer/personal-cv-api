import { startServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { createDiirIfNotExist } from "./utils/createDirIfNotExist.js";
import { TMP_UPLOAD_DIR, UPLOAD_DIR } from "./config/constants.js";
const bootstrap = async () => {
    // conect  to DB
    await initMongoDB();
    // // create dirs for upload files
    await createDiirIfNotExist(TMP_UPLOAD_DIR);
    await createDiirIfNotExist(UPLOAD_DIR);
    // // start server
    startServer();
};
bootstrap();
