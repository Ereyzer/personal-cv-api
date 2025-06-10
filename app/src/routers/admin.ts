import { Router, Request, Response } from 'express';

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
  // getOneIconController,
  uploadAvatar,
  // uploadSvgIcons,
} from '../controlers/files.ts';
import {
  validateAvatar,
  // validateIcon
} from '../middlewares/validateFile.ts';
import {
  avatarValidSchema,
  //  iconValidSchema
} from '../validation/fileValidators.ts';
import {
  createSoftSkillController,
  getAllSoftSkillsController,
  getSoftSkillController,
} from '../controlers/softSkills.ts';
import {
  PaginationQuerySchema,
  SoftSkillsAllParamsSchema,
  SoftSkillsParamsValidScchema,
  SoftSkillsUpsertBodySchema,
} from '../validation/softSkils.ts';
import { validateQuery } from '../middlewares/validateQuery.ts';
import { HardSkillsCreateBodySchema } from '../validation/hardSkills.ts';
import {
  createHardSkillController,
  getAllHardSkillsController,
  updateHardSkillController,
} from '../controlers/hardSkills.ts';
import { IdValidationSchema } from '../validation/schemas.ts';

import { sendAuthMAil } from '../utils/sendMail.ts';

const router = Router();

// TODO: admin page
// router.get('', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).sendFile(path.join(DIR_NAME, 'src/static/html/index.html'));
// });
// router.get('', async (_req: Request, res: Response) => {
//     res.status(HttpCode.OK).json({
//         message: 'hello'
//     });
// });

router.get('/test', async (req: Request, res: Response) => {
  console.log('Hello Admin');
  await sendAuthMAil('ivanlaver142@gmail.com');
  res.send('Hello admin');
});

// TODO: UPLOAD AVATAR
router.post(
  '/files/avatar',
  upload.single('avatar'),
  validateAvatar(avatarValidSchema),
  ctrlWrapper(uploadAvatar)
);

router.get('/info', ctrlWrapper(getAllInfoController));

// router.get svg

router.get('/info/icons', ctrlWrapper(getAllIconController));
// TODO: GET ICON BY ID
// router.get('/files/icon/:id', ctrlWrapper(getOneIconController));
// TODO: ADD ICON
// router.post(
//   '/files/icons',
//   upload.array('icons', 10),
//   validateIcon(iconValidSchema),
//   ctrlWrapper(uploadSvgIcons)
// );

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
  '/softSkills/:language',
  validateParams(SoftSkillsAllParamsSchema),
  validateQuery(PaginationQuerySchema),
  ctrlWrapper(getAllSoftSkillsController)
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

router.post(
  '/hardSkills',
  validateBody(HardSkillsCreateBodySchema),
  ctrlWrapper(createHardSkillController)
);

router.put(
  '/hardSkills/:_id',
  validateParams(IdValidationSchema),
  validateBody(HardSkillsCreateBodySchema),
  ctrlWrapper(updateHardSkillController)
);

router.get(
  '/hardSkills',
  validateQuery(PaginationQuerySchema),
  ctrlWrapper(getAllHardSkillsController)
);
export default router;
