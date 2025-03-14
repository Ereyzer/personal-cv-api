// export const getAllSoftSkillsController

import mongoose from 'mongoose';
import { HttpCode } from '../config/constants.ts';
import { ELanguage, IController, ISoftSkill } from '../interfaces/interface_controlers.ts';
import { upsertSoftSkill, getOneSoftSkill } from '../services/softSkills.ts';

export const getSoftSkillController: IController = async (req, res) => {
  const { language, id } = req.params as unknown as {
    language: ELanguage;
    id: mongoose.Schema.Types.ObjectId;
  };

  const data = await getOneSoftSkill(id, language);

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    data,
  });
};

export const createSoftSkillController: IController = async (req, res) => {
  const body = req.body as unknown as { language: ELanguage; skill: ISoftSkill };

  const data = await upsertSoftSkill(body.skill, body.language);

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data,
  });
};

// export const updateSoftSkillController
