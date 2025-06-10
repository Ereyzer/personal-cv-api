import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { createPasswordCtr } from '../controlers/auth.ts';
import { validateParams } from '../middlewares/validateParams.ts';
import { tokenValidSchema } from '../validation/auth.ts';

const router = Router();

router.get(
  '/create-password/:token',
  validateParams(tokenValidSchema),
  ctrlWrapper(createPasswordCtr)
);
export default router;
