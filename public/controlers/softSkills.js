import { HttpCode } from "../config/constants.js";
import { upsertSoftSkill, getOneSoftSkill, getAllSoftSkills } from "../services/softSkills.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
export const getAllSoftSkillsController = async (req, res) => {
    const { language } = req.params;
    const paginatQuery = req.query;
    const { page, perPage } = parsePaginationParams(paginatQuery);
    const data = await getAllSoftSkills(language, page, perPage);
    res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        message: `page: ${page}, has ${perPage} elements`,
        ...data,
    });
};
export const getSoftSkillController = async (req, res) => {
    const { language, id } = req.params;
    const data = await getOneSoftSkill(id, language);
    res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data,
    });
};
export const createSoftSkillController = async (req, res) => {
    const body = req.body;
    const data = await upsertSoftSkill(body.skill, body.language);
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data,
    });
};
// export const updateSoftSkillController
