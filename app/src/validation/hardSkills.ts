import Joi from 'joi';

export const HardSkillsCreateBodySchema = Joi.object({
  image: Joi.string(),
  title: Joi.string().required(),
});

export const hardSkillsIdListInQuerySchema = Joi.object({
  idArr: Joi.string().required(),
});
