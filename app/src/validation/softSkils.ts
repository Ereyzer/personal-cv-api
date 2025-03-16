import Joi from 'joi';
import { ELanguage } from '../interfaces/interface_controlers.ts';

export const SoftSkillsAllParamsSchema = Joi.object({
  language: Joi.string().valid(ELanguage.EN, ELanguage.UK).required(),
  page: Joi.string(),
  perPage: Joi.string(),
});

export const SoftSkillsParamsValidScchema = Joi.object({
  language: Joi.string().valid(ELanguage.EN, ELanguage.UK).required(),
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message('must be an ObjectId')
    .required(),
});

export const SoftSkillsUpsertBodySchema = Joi.object({
  language: Joi.string().valid(ELanguage.EN, ELanguage.UK).required(),
  skill: Joi.object({
    _id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message('must be an ObjectId'),
    icon: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message('must be an ObjectId'),
    title: Joi.string().required(),
    text: Joi.string().required(),
  }),
});
