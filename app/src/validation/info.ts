import Joi from 'joi';
import {
  isFacebookLink,
  isGithubLink,
  isInstagramLink,
  isLinkedinLink,
  isSkypeLink,
} from './validators';

const simleInfoFields: string[] = [
  'avatar',
  'contact_email',
  'resume_file',
  'linkedin',
  'github',
  'instagram',
  'facebook',
  'skype',
];

export const updateSimpleFildeValidSchema = Joi.object({
  field: Joi.string()
    .valid(...simleInfoFields)
    .required(),
});

export const updateSimpleBodyValidSchema = Joi.object({
  value: Joi.string().required(),
});

export const simpleFieldsSchema = Joi.object({
  contact_email: Joi.string().email(),
  // linkedin: Joi.string().pattern(/^https\:\/\/www\.linkedin\.com\/in\/\S+\//, 'linkedin url'),

  linkedin: Joi.string()
    .custom(isLinkedinLink, 'linkedin url validation')
    .messages({ 'any.custom': '{{#message}}' }),
  github: Joi.string().custom(isGithubLink, 'gihub url').messages({ 'any.custom': '{{#message}}' }),
  instagram: Joi.string()
    .custom(isInstagramLink, 'instagram url')
    .messages({ 'any.custom': '{{#message}}' }),
  facebook: Joi.string()
    .custom(isFacebookLink, 'facebok url')
    .messages({ 'any.custom': '{{#message}}' }),
  skype: Joi.string().custom(isSkypeLink, 'skype url').messages({ 'any.custom': '{{#message}}' }),
  //   avatar: Joi.string()
  //   resume_file?: string;
});
