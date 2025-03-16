import { ISoftSkill } from 'app/src/interfaces/interface_controlers.ts';
import mongoose from 'mongoose';

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

// export const SoftSkillsENCollection = mongoose.model('EnSoftSkill', softSkillsSchema);
// export const SoftSkillsUkCollection = mongoose.model('UkSoftSkill', softSkillsSchema);

export const SoftSkillsCollection = mongoose.model('soft_skills', SoftSkillsSchema);
