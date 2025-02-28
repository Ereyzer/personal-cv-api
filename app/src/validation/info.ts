import Joi from 'joi';
import {
  isFacebookLink,
  isGithubLink,
  isInstagramLink,
  isLinkedinLink,
  isPhoneLink,
} from './validators';

// const simleInfoFields: string[] = [
//   'avatar',
//   'contact_email',
//   'resume_file',
//   'linkedin',
//   'github',
//   'instagram',
//   'facebook',
//   'phone',
// ];

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
  phone: Joi.string().custom(isPhoneLink, 'phone url').messages({ 'any.custom': '{{#message}}' }),
  //   avatar: Joi.string()
  //   resume_file?: string;
});
const simleInfoFields: string[] = simpleFieldsSchema['$_terms'].keys.reduce(
  (prev: string[], { key }: { key?: string; schema?: object }): string[] => {
    if (!key) {
      return [...prev];
    } else {
      return [key, ...prev];
    }
  },
  []
);

export const updateSimpleFildeValidSchema = Joi.object({
  field: Joi.string()
    .valid(...simleInfoFields)
    .required(),
});

export const langFieldSchema = Joi.object({
  intro: Joi.object({
    en: Joi.string().min(5).max(100),
    uk: Joi.string().min(5).max(100),
  }),
  about: Joi.object({
    en: Joi.string().min(5).max(1000),
    uk: Joi.string().min(5).max(1000),
  }),
});

const langFialds: string[] = langFieldSchema['$_terms'].keys.reduce(
  (prev: string[], { key }: { key?: string; schema?: object }): string[] => {
    if (!key) {
      return [...prev];
    } else {
      return [key, ...prev];
    }
  },
  []
);

export const updateLangFildeValidSchema = Joi.object({
  field: Joi.string()
    .valid(...langFialds)
    .required(),
});
