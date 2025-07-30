import multer from 'multer';
import { Express, Request } from 'express';
import { TMP_UPLOAD_DIR } from '../config/constants.ts';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const fackErr = new Error('didi o no');
    cb(fackErr, TMP_UPLOAD_DIR);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const uniqueSuffix = Date.now();
    const fackErr = new Error('didi o no 2');
    cb(fackErr, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
