import { Router } from 'express';
// import { Router } from 'express';
import { getAllInfoController, patchInfoController, patchInfoEnController, patchInfoUkController, } from "../controlers/info.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateParams } from "../middlewares/validateParams.js";
import { updateLangFildeValidSchema, updateSimpleBodyValidSchema, updateSimpleFildeValidSchema, } from "../validation/info.js";
import { validateBody } from "../middlewares/validateBody.js";
import { upload } from "../middlewares/multer.js";
import { getAllIconController, getOneIconController, uploadAvatar, uploadSvgIcons, } from "../controlers/files.js";
import { validateAvatar, validateIcon } from "../middlewares/validateFile.js";
import { avatarValidSchema, iconValidSchema } from "../validation/fileValidators.js";
import { createSoftSkillController, getAllSoftSkillsController, getSoftSkillController, } from "../controlers/softSkills.js";
import { PaginationQuerySchema, SoftSkillsAllParamsSchema, SoftSkillsParamsValidScchema, SoftSkillsUpsertBodySchema, } from "../validation/softSkils.js";
import { validateQuery } from "../middlewares/validateQuery.js";
import { HardSkillsCreateBodySchema } from "../validation/hardSkills.js";
import { createHardSkillController, getAllHardSkillsController, updateHardSkillController, } from "../controlers/hardSkills.js";
import { IdValidationSchema } from "../validation/schemas.js";
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
router.post('/files/avatar', upload.single('avatar'), validateAvatar(avatarValidSchema), ctrlWrapper(uploadAvatar));
router.get('/info', ctrlWrapper(getAllInfoController));
// router.get svg
router.get('/info/icons', ctrlWrapper(getAllIconController));
router.get('/files/icon/:id', ctrlWrapper(getOneIconController));
router.post('/files/icons', upload.array('icons', 10), validateIcon(iconValidSchema), ctrlWrapper(uploadSvgIcons));
router.patch('/info/en/:field', validateParams(updateLangFildeValidSchema), validateBody(updateSimpleBodyValidSchema), ctrlWrapper(patchInfoEnController));
router.patch('/info/uk/:field', validateParams(updateLangFildeValidSchema), validateBody(updateSimpleBodyValidSchema), ctrlWrapper(patchInfoUkController));
router.patch('/info/:field', validateParams(updateSimpleFildeValidSchema), validateBody(updateSimpleBodyValidSchema), ctrlWrapper(patchInfoController));
router.get('/softSkills/:language', validateParams(SoftSkillsAllParamsSchema), validateQuery(PaginationQuerySchema), ctrlWrapper(getAllSoftSkillsController));
router.get('/softSkills/:id/:language', validateParams(SoftSkillsParamsValidScchema), ctrlWrapper(getSoftSkillController));
router.post('/softSkills', validateBody(SoftSkillsUpsertBodySchema), ctrlWrapper(createSoftSkillController));
router.post('/hardSkills', validateBody(HardSkillsCreateBodySchema), ctrlWrapper(createHardSkillController));
router.put('/hardSkills/:_id', validateParams(IdValidationSchema), validateBody(HardSkillsCreateBodySchema), ctrlWrapper(updateHardSkillController));
router.get('/hardSkills', validateQuery(PaginationQuerySchema), ctrlWrapper(getAllHardSkillsController));
export default router;
