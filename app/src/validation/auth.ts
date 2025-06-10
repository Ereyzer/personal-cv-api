import Joi from 'joi';

export const requesrResetEmailShema = Joi.object({
  email: Joi.string().email().required(),
});

export const tokenValidSchema = Joi.object({
  token: Joi.string().required(),
});
