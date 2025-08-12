import mongoose from 'mongoose';

import { ISoftSkill } from '../../interfaces/interface_controlers.ts';

const SoftSkillsSchema = new mongoose.Schema<Pick<ISoftSkill, '_id' | 'icon'>>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      auto: true,
    },
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      default: null,
      ref: 'icons',
    },
  },
  {
    collection: 'soft_skills',
    timestamps: true,
  }
);

export const SoftSkillsCollection = mongoose.model('soft_skills', SoftSkillsSchema);
