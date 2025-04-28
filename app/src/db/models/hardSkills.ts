import { IHardSkill } from '../../../../app/src/interfaces/interface_controlers.ts';
import mongoose from 'mongoose';

export const HardSkillsSchema = new mongoose.Schema<IHardSkill>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      auto: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      default: null,
      require: false,
    },
    title: {
      type: mongoose.Schema.Types.String,
      require: true,
      unique: true,
    },
  },
  {
    collection: 'hard_skills',
    timestamps: true,
  }
);

export const HardSkillsCollection = mongoose.model('hard_scills', HardSkillsSchema);
