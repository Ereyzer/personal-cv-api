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
  uploadAvatar,
} from '../controlers/files.ts';
import { validateFile } from '../middlewares/validateFile.ts';
import {
  avatarValidSchema,
  projectImageValidSchema,
  resumeValidSchema,
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
import {
  getStatisticsController,
  updateStatisticsByActController,
} from '../controlers/statistics.ts';
import { statiscticsQueryValidSchema } from '../validation/statistics.ts';

const router = Router();

router.get('/test', authenticate, async (req: Request, res: Response) => {
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

router.get('/info/icons', ctrlWrapper(getAllIconController));

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

router.get('/statistics', authenticate, ctrlWrapper(getStatisticsController));

router.put(
  '/statistics',
  validateQuery(statiscticsQueryValidSchema),
  ctrlWrapper(updateStatisticsByActController)
);
export default router;
