import mongoose from 'mongoose';

import { ELanguage, ISoftSkill } from '../interfaces/interface_controlers.ts';
import { SoftSkillsCollection } from '../db/models/softSkills.ts';
import { EnSoftSkillsCollection, UkSoftSkillsCollection } from '../db/models/languageSupport.ts';
import { NotFoundError } from '../config/err-const.ts';
// type TLenguage = 'EN' | 'UK';

// en
// get all

// get one
export const getOneSoftSkill = async (id: mongoose.Schema.Types.ObjectId, lang: ELanguage) => {
  let skill: mongoose.Document | null;
  switch (lang) {
    case ELanguage.EN:
      skill = await EnSoftSkillsCollection.findById(id).populate('_id').exec();
      break;

    case ELanguage.UK:
      skill = await UkSoftSkillsCollection.findById(id).populate('_id').exec();
      break;

    default:
      throw new NotFoundError('this languge did not support');
      break;
  }
  if (!skill) throw new NotFoundError(`not found softSkill id: ${id}`);
  const response = skill.toJSON();
  return {
    ...response,
    ...response._id,
  };
};

// create one by
export const upsertSoftSkill = async (
  { text, title, icon, _id }: ISoftSkill,
  lan: ELanguage
): Promise<mongoose.Document | never> => {
  let skill = await SoftSkillsCollection.findById(_id);

  if (!skill) {
    skill = new SoftSkillsCollection({});
    if (icon) skill.icon = icon;
    skill = await skill.save();
  }

  let lang: mongoose.Document<mongoose.Schema.Types.ObjectId, unknown, Omit<ISoftSkill, 'icon'>>;

  switch (lan) {
    case ELanguage.EN:
      lang = new EnSoftSkillsCollection({ _id: skill._id, text, title });
      break;
    case ELanguage.UK:
      lang = new UkSoftSkillsCollection({ _id: skill._id, text, title });
      break;

    default:
      throw new NotFoundError('this languge did not support');
      break;
  }

  lang = await lang.save();

  return { ...skill.toJSON(), ...lang.toJSON() } as unknown as mongoose.Document;
};

// update one by id

// uk
// get all

// get one

// create one by id

// update one by id
