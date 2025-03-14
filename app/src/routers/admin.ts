import { Router } from 'express';
// import { Router } from 'express';

import {
  getAllInfoController,
  patchInfoController,
  patchInfoEnController,
  patchInfoUkController,
} from '../controlers/info.ts';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { validateParams } from '../middlewares/validateParams.ts';
import {
  updateLangFildeValidSchema,
  updateSimpleBodyValidSchema,
  updateSimpleFildeValidSchema,
} from '../validation/info.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import { upload } from '../middlewares/multer.ts';
import {
  getAllIconController,
  getOneIconController,
  uploadAvatar,
  uploadSvgIcons,
} from '../controlers/files.ts';
import { validateAvatar, validateIcon } from '../middlewares/validateFile.ts';
import { avatarValidSchema, iconValidSchema } from '../validation/fileValidators.ts';
import { createSoftSkillController, getSoftSkillController } from '../controlers/softSkills.ts';
import {
  SoftSkillsParamsValidScchema,
  SoftSkillsUpsertBodySchema,
} from '../validation/softSkils.ts';

const router = Router();

// TODO: admin page
// router.get('', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).sendFile(path.join(__dirname, 'src/static/html/index.html'));
// });
// router.get('', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).json({
//         message: 'hello'
//     });
// });

// TODO: Get all exisist info
router.post(
  '/files/avatar',
  upload.single('avatar'),
  validateAvatar(avatarValidSchema),
  ctrlWrapper(uploadAvatar)
);

router.get('/info', ctrlWrapper(getAllInfoController));

// router.get svg

router.get('/info/icons', ctrlWrapper(getAllIconController));

router.get('/files/icon/:id', ctrlWrapper(getOneIconController));

router.post(
  '/files/icons',
  upload.array('icons', 10),
  validateIcon(iconValidSchema),
  ctrlWrapper(uploadSvgIcons)
);

router.patch(
  '/info/en/:field',
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoEnController)
);

router.patch(
  '/info/uk/:field',
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoUkController)
);

router.patch(
  '/info/:field',
  validateParams(updateSimpleFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoController)
);

router.get(
  '/softSkills/:id/:language',
  validateParams(SoftSkillsParamsValidScchema),
  ctrlWrapper(getSoftSkillController)
);
router.post(
  '/softSkills',
  validateBody(SoftSkillsUpsertBodySchema),
  ctrlWrapper(createSoftSkillController)
);

export default router;
