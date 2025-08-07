import { Router, Request, Response } from 'express';

import {
  clearSocialLink,
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
  cutAvatar,
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
  removeSoftSkillController,
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
  deleHArdSkillController,
  getAllHardSkillsController,
  updateHardSkillController,
} from '../controlers/hardSkills.ts';
import { IdValidationSchema } from '../validation/schemas.ts';
import { cleearExpiredTokens } from '../services/session.ts';
import { authenticate } from '../middlewares/auth.ts';
// import { crypter } from '../utils/crypter.ts';

// import { readJWT } from '../utils/createJWT.ts';

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

router.get('/test', authenticate, async (req: Request, res: Response) => {
  console.log('Hello Admin');
  // await sendAuthMAil('ivanlaver142@gmail.com');
  // readJWT('ddd');
  // readJWT(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODNiZjcwNTJlYmQ3ODc3ZWRlOTg3NmYiLCJlbWFpbCI6Iml2YW5sYXZlcjE0MkBnbWFpbC5jb20iLCJkYXRlIjoxNzQ5NjI5NTI5NDI2LCJpYXQiOjE3NDk2Mjk1Mjl9.eAl8A40PGxvgwFwRtYdv37DJQbQD2AcNQI_S0fkeFWY'
  // );
  // const encripted = await crypter.encryptHash('12345678');
  // console.log('encripted: ', encripted);
  // const encripte = await crypter.encryptHash('12345678');
  // console.log('encripted: ', encripte);
  // const isEqualTrue = await crypter.compareHash(encripted, '12345678');
  // const isEqualFalse = await crypter.compareHash(encripted, '12345679');
  // console.log('isEqualTrue: ', isEqualTrue);
  // console.log('isEqualFalse: ', isEqualFalse);

  await cleearExpiredTokens();
  res.send('Hello admin');
});

// TODO: UPLOAD AVATAR
router.post(
  '/files/avatar',
  authenticate,
  upload.single('avatar'),
  validateAvatar(avatarValidSchema),
  ctrlWrapper(uploadAvatar)
);
router.post(
  '/files/cutavatar',
  authenticate,
  upload.single('avatar'),
  validateAvatar(avatarValidSchema),
  ctrlWrapper(cutAvatar)
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
  authenticate,
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoEnController)
);

router.patch(
  '/info/uk/:field',
  authenticate,
  validateParams(updateLangFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoUkController)
);

router.patch(
  '/info/:field',
  authenticate,
  validateParams(updateSimpleFildeValidSchema),
  validateBody(updateSimpleBodyValidSchema),
  ctrlWrapper(patchInfoController)
);

router.delete(
  '/info/:field',
  authenticate,
  validateParams(updateSimpleFildeValidSchema),
  ctrlWrapper(clearSocialLink)
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
  authenticate,
  validateBody(SoftSkillsUpsertBodySchema),
  ctrlWrapper(createSoftSkillController)
);
router.delete(
  '/softSkills/:_id',
  authenticate,
  validateParams(IdValidationSchema),

  ctrlWrapper(removeSoftSkillController)
);

router.post(
  '/hardSkills',
  authenticate,
  validateBody(HardSkillsCreateBodySchema),
  ctrlWrapper(createHardSkillController)
);

router.put(
  '/hardSkills/:_id',
  authenticate,
  validateParams(IdValidationSchema),
  validateBody(HardSkillsCreateBodySchema),
  ctrlWrapper(updateHardSkillController)
);

router.get(
  '/hardSkills',
  validateQuery(PaginationQuerySchema),
  ctrlWrapper(getAllHardSkillsController)
);

router.delete(
  '/hardSkills/:_id',
  authenticate,
  validateParams(IdValidationSchema),
  ctrlWrapper(deleHArdSkillController)
);
export default router;
