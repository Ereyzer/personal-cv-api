import { HttpCode } from "../config/constants.js";
import { createtHardSkill, getHardSkills, updateHardSkill } from "../services/hardSkills.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
export const createHardSkillController = async (req, res) => {
    const body = req.body;
    const data = await createtHardSkill(body);
    res.status(HttpCode.CREATED).json({
        starus: HttpCode.CREATED,
        data,
    });
};
export const updateHardSkillController = async (req, res) => {
    const body = req.body;
    const { _id } = req.params;
    const data = await updateHardSkill({ _id, ...body });
    res.status(HttpCode.CREATED).json({
        starus: HttpCode.CREATED,
        data,
    });
};
export const getAllHardSkillsController = async (req, res) => {
    const paginatQuery = req.query;
    const data = await getHardSkills(parsePaginationParams(paginatQuery));
    res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        message: `page: ${paginatQuery.page}, has ${paginatQuery.perPage} elements`,
        ...data,
    });
};
