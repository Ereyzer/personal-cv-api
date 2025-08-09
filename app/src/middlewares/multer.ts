import multer from 'multer';
import { Express, Request } from 'express';
import { TMP_UPLOAD_DIR } from '../config/constants.ts';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, TMP_UPLOAD_DIR);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });

const storageDownload = multer.diskStorage({
  destination: (res: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, TMP_UPLOAD_DIR);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const download = multer({ storage: storageDownload });
