import mongoose from 'mongoose';
import { HttpCode } from '../config/constants.ts';
import { ELanguage, IController, ISoftSkill } from '../interfaces/interface_controlers.ts';
import { upsertSoftSkill, getOneSoftSkill, getAllSoftSkills } from '../services/softSkills.ts';
import { parsePaginationParams } from '../utils/parsePaginationParams.ts';

export const getAllSoftSkillsController: IController = async (req, res) => {
  const { language } = req.params as {
    language: ELanguage;
  };
  const paginatQuery = req.query as unknown as {
    page: string;
    perPage: string;
  };

  const { page, perPage } = parsePaginationParams(paginatQuery);
  const data = await getAllSoftSkills(language, page, perPage);

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    message: `page: ${page}, has ${perPage} elements`,
    ...data,
  });
};

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
