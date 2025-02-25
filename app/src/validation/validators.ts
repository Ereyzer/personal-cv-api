import Joi from 'joi';

const linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/\S+\//;
const githubPattern = /^https:\/\/www\.gihub\.com\/\S+/;
const instagramPattern = /^https:\/\/www\.instagram\.com\/\S+\//;
const facebokPattern = /^https:\/\/www\.facebook\.com\/profile\.php\?\S+\//;
const skypePattern = /^https:\/\/join\.skype\.com\/ivite\/\S+/;

class LinksValidators {
  private pattern: RegExp;
  private message: string;

  constructor(pattern: RegExp, name: string) {
    this.pattern = pattern;
    this.message = `invalid ${name} uri`;
  }

  init = (): Joi.CustomValidator => (value: string, helpers) =>
    !value.match(this.pattern) ? helpers.error('any.custom', { message: this.message }) : value;
}

export const isLinkedinLink: Joi.CustomValidator = new LinksValidators(
  linkedinPattern,
  'linkedin'
).init();

export const isFacebookLink: Joi.CustomValidator = new LinksValidators(
  facebokPattern,
  'facebook'
).init();

export const isInstagramLink: Joi.CustomValidator = new LinksValidators(
  instagramPattern,
  'instagram'
).init();

export const isSkypeLink: Joi.CustomValidator = new LinksValidators(skypePattern, 'skype').init();

export const isGithubLink: Joi.CustomValidator = new LinksValidators(
  githubPattern,
  'github'
).init();
