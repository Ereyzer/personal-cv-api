import Joi from 'joi';
import { statisticsFieldsEnum } from '../interfaces/services.ts';
import { ELanguage } from '../interfaces/interface_controlers.ts';

const languageTester = () => {
  const lang = Object.values(ELanguage);
  const lovercase = lang.map(key => key.toLowerCase());
  return [...lang, ...lovercase];
};
export const statiscticsQueryValidSchema = Joi.object({
  act: Joi.string()
    .valid(...Object.values(statisticsFieldsEnum))
    .required(),
  language: Joi.string()
    .valid(...languageTester())
    .required(),
});
