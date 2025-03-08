import { Router } from 'express';
// import { Router } from 'express';

import {
  getAllInfoController,
  patchInfoController,
  patchInfoEnController,
  patchInfoUkController,
} from '../controlers/info';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateParams } from '../middlewares/validateParams';
import {
  updateLangFildeValidSchema,
  updateSimpleBodyValidSchema,
  updateSimpleFildeValidSchema,
} from '../validation/info';
import { validateBody } from '../middlewares/validateBody';
import { upload } from '../middlewares/multer';
import { uploadAvatar } from '../controlers/files';
import { validateAvatar } from '../middlewares/validateFile';
import { avatarValidSchema } from '../validation/fileValidators';
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
router.post(
  '/admin/files/avatar',
  upload.single('avatar'),
  validateAvatar(avatarValidSchema),
  ctrlWrapper(uploadAvatar)
);

router.get('/admin/info', ctrlWrapper(getAllInfoController));

router.patch(
  '/admin/info/en/:field',
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoEnController)
);

router.patch(
  '/admin/info/uk/:field',
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoUkController)
);

router.patch(
  '/admin/info/:field',
  validateParams(updateSimpleFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoController)
);

export default router;
