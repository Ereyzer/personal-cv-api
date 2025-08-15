import Joi from 'joi';
import { ELanguage } from '../interfaces/interface_controlers.ts';

export const newProjectBodySchema = Joi.object({
  link: Joi.string().required(),
  github: Joi.string().required(),
  technology: Joi.array<string>().required(),
});

export const updateProjectBodySchema = Joi.object({
  link: Joi.string(),
  github: Joi.string(),
  technology: Joi.array<string>(),
});

export const updateProjectLanguageSchema = Joi.object({
  language: Joi.string().valid(...Object.values(ELanguage)),
  title: Joi.string(),
  description: Joi.string(),
});

export const getProjectsQueryValidationSchema = Joi.object({
  perPage: Joi.string(),
  page: Joi.string(),
  language: Joi.string().valid(...Object.values(ELanguage)),
});
