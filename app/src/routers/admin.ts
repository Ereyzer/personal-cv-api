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
  addResumeController,
  cutAvatar,
  deleteResumeController,
  getAllIconController,
  getResumeController,
  // getOneIconController,
  uploadAvatar,
  // uploadSvgIcons,
} from '../controlers/files.ts';
import {
  validateFile,
  // validateIcon
} from '../middlewares/validateFile.ts';
import {
  avatarValidSchema,
  projectImageValidSchema,
  resumeValidSchema,
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
import {
  HardSkillsCreateBodySchema,
  hardSkillsIdListInQuerySchema,
} from '../validation/hardSkills.ts';
import {
  createHardSkillController,
  deleHArdSkillController,
  getAllHardSkillsController,
  getHardSkillsListByIdController,
  updateHardSkillController,
} from '../controlers/hardSkills.ts';
import { IdValidationSchema } from '../validation/schemas.ts';
import { cleearExpiredTokens } from '../services/session.ts';
import { authenticate } from '../middlewares/auth.ts';
import {
  createProjectController,
  deleteOneProjectController,
  getAllProjectsController,
  updateProjectController,
  updateProjectLangugeController,
} from '../controlers/projects.ts';
import {
  getProjectsQueryValidationSchema,
  newProjectBodySchema,
  updateProjectBodySchema,
  updateProjectLanguageSchema,
} from '../validation/projects.ts';
import { ValidateFormData } from '../middlewares/validateFormData.ts';
import { converTechnology } from '../middlewares/converteTechnology.ts';
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
  validateFile(avatarValidSchema),
  ctrlWrapper(uploadAvatar)
);
router.post(
  '/files/cutavatar',
  authenticate,
  upload.single('avatar'),
  validateFile(avatarValidSchema),
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
router.get(
  '/hardSkills/ids',
  validateQuery(hardSkillsIdListInQuerySchema),
  ctrlWrapper(getHardSkillsListByIdController)
);

router.delete(
  '/hardSkills/:_id',
  authenticate,
  validateParams(IdValidationSchema),
  ctrlWrapper(deleHArdSkillController)
);

router.post(
  '/info/resume',
  authenticate,
  upload.single('resume'),
  validateFile(resumeValidSchema),
  ctrlWrapper(addResumeController)
);

router.get('/info/resume', ctrlWrapper(getResumeController));

router.delete('/info/resume', authenticate, ctrlWrapper(deleteResumeController));
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
  '/projects',
  validateQuery(getProjectsQueryValidationSchema),
  ctrlWrapper(getAllProjectsController)
);
router.post(
  '/projects',
  authenticate,
  upload.single('image'),
  validateFile(projectImageValidSchema),
  converTechnology,
  ValidateFormData(newProjectBodySchema),
  ctrlWrapper(createProjectController)
);
router.patch(
  '/projects/language/:_id',
  validateParams(IdValidationSchema),
  authenticate,
  validateBody(updateProjectLanguageSchema),
  ctrlWrapper(updateProjectLangugeController)
);
router.patch(
  '/projects/:_id',
  validateParams(IdValidationSchema),
  authenticate,
  upload.single('image'),
  validateFile(projectImageValidSchema),
  converTechnology,
  ValidateFormData(updateProjectBodySchema),
  ctrlWrapper(updateProjectController)
);
router.delete(
  '/projects/:_id',
  validateParams(IdValidationSchema),
  authenticate,
  ctrlWrapper(deleteOneProjectController)
);
export default router;
