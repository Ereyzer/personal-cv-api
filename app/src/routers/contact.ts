import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.ts';
import { contactMeByEmailController } from '../controlers/contactme.ts';
import { validateBody } from '../middlewares/validateBody.ts';
import { contactMeByEmailBodySchema } from '../validation/contact.ts';

const router = Router();

router.post(
  '/byemail',
  validateBody(contactMeByEmailBodySchema),
  ctrlWrapper(contactMeByEmailController)
);

export default router;
