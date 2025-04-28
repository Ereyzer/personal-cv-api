import multer from 'multer';
import { TMP_UPLOAD_DIR } from "../config/constants.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TMP_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    },
});
export const upload = multer({ storage });
