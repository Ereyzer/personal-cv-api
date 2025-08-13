import Joi from 'joi';

export const contactMeByEmailBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  text: Joi.string().required(),
});
