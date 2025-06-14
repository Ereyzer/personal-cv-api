import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import {
  createPasswordCtr,
  loginUserCtr,
  logoutUserCtr,
  refreshUserSessionCtr,
  updatePasswordCtr,
} from '../controlers/auth.ts';
import { validateParams } from '../middlewares/validateParams.ts';
import { loginBodySchema, newPasswordBody, tokenValidSchema } from '../validation/auth.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import { authenticate } from '../middlewares/auth.ts';

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

router.post('/login', validateBody(loginBodySchema), ctrlWrapper(loginUserCtr));

router.post('/logout', authenticate, ctrlWrapper(logoutUserCtr));

router.post('/refresh', ctrlWrapper(refreshUserSessionCtr));

export default router;
