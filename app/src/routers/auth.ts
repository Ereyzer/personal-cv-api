import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { createPasswordCtr, updatePasswordCtr } from '../controlers/auth.ts';
import { validateParams } from '../middlewares/validateParams.ts';
import { newPasswordBody, tokenValidSchema } from '../validation/auth.ts';
import { validateBody } from '../middlewares/validateBody.ts';

const router = Router();

router.get(
  '/create-password/:token',
  validateParams(tokenValidSchema),
  ctrlWrapper(createPasswordCtr)
);

router.patch(
  '/create-password/:token',
  validateParams(tokenValidSchema),
  validateBody(newPasswordBody),
  ctrlWrapper(updatePasswordCtr)
);
export default router;
