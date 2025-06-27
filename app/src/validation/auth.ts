import Joi from 'joi';

export const requesrResetEmailShema = Joi.object({
  email: Joi.string().email().required(),
});

export const tokenValidSchema = Joi.object({
  token: Joi.string().required(),
});

export const newPasswordBody = Joi.object({
  password: Joi.string().min(8).max(30).required(),
});

export const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  name: Joi.string(),
});
