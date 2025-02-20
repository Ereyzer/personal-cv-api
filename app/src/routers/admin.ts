import { Router } from 'express';

import { getAllInfoController } from '../controlers/info';
// import path from 'path';
// import { HttpCode, __dirname } from '../config/constants';

const router = Router();

// TODO: admin page
// router.get('/admin', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).sendFile(path.join(__dirname, 'src/static/html/index.html'));
// });
// router.get('/admin', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).json({
//         message: 'hello'
//     });
// });

// TODO: Get all exisist info
router.get('/admin/info', getAllInfoController);

// TODO:  UPDATE all exist info

export default router;
