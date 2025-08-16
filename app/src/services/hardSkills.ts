import mongoose from 'mongoose';

import { HardSkillsCollection } from '../db/models/hardSkills.ts';
import { IHardSkill, IPaginationResp } from '../interfaces/interface_controlers.ts';
import { calculatePaginationData } from '../utils/calculatePaginationData.ts';

export const createtHardSkill = async (skill: Partial<IHardSkill>): Promise<mongoose.Document> => {
  const data = new HardSkillsCollection(skill);
  return await data.save();
};

export const updateHardSkill = async ({
  _id,
  title,
  image,
}: Partial<IHardSkill>): Promise<mongoose.Document | null> => {
  const upadateObj: Partial<IHardSkill> = {};

  if (title) upadateObj.title = title;
  if (image) upadateObj.image = image;
  return await HardSkillsCollection.findByIdAndUpdate(_id, upadateObj, { new: true });
};

export const getHardSkills = async ({
  page,
  perPage,
}: Pick<IPaginationResp, 'page' | 'perPage'>): Promise<IPaginationResp> => {
  const skip = (page - 1) * perPage;

  const [totalItems, data] = await Promise.all([
    HardSkillsCollection.find().countDocuments(),
    HardSkillsCollection.find().skip(skip).limit(perPage).exec(),
  ]);

  return {
    ...calculatePaginationData(totalItems, page, perPage),
    data,
  };
};

export const deleteHardSkill = async (id: string): Promise<void | null> => {
  return await HardSkillsCollection.findByIdAndDelete(id);
};

export const getSomeHardSkillsByIds = async (id: string[]) => {
  return await HardSkillsCollection.find({ _id: { $in: id } });
};
