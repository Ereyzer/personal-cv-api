import mongoose from 'mongoose';

import { ISoftSkill } from '../../interfaces/interface_controlers.ts';

export const LanguageSoftSkillDefinition = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'soft_skills',
  },
  title: {
    type: String,
    require: true,
    maxLength: 30,
  },
  text: {
    type: String,
    require: true,
    maxLength: 160,
  },
} as const;
const LanguageSoftSkillsSupportSchema = new mongoose.Schema<Omit<ISoftSkill, 'icon'>>(
  LanguageSoftSkillDefinition,
  {
    timestamps: true,
  }
);

export const EnSoftSkillsCollection = mongoose.model(
  'ENSupportSoftSkills',
  LanguageSoftSkillsSupportSchema
);
export const UkSoftSkillsCollection = mongoose.model(
  'UKSupportSoftSkills',
  LanguageSoftSkillsSupportSchema
);
