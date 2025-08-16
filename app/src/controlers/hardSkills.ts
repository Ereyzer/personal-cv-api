import { HttpCode } from '../config/constants.ts';
import { BadRequest, InternalServerError } from '../config/err-const.ts';
import { IController, IHardSkill } from '../interfaces/interface_controlers.ts';
import {
  createtHardSkill,
  deleteHardSkill,
  getHardSkills,
  getSomeHardSkillsByIds,
  updateHardSkill,
} from '../services/hardSkills.ts';
import { parsePaginationParams } from '../utils/parsePaginationParams.ts';

export const createHardSkillController: IController = async (req, res) => {
  const body = req.body as unknown as Partial<IHardSkill>;

  const data = await createtHardSkill(body);

  res.status(HttpCode.CREATED).json({
    starus: HttpCode.CREATED,
    data,
  });
};

export const updateHardSkillController: IController = async (req, res) => {
  const body = req.body as unknown as Pick<IHardSkill, 'image' | 'title'>;
  const { _id } = req.params as unknown as Pick<IHardSkill, '_id'>;
  const data = await updateHardSkill({ _id, ...body });

  res.status(HttpCode.CREATED).json({
    starus: HttpCode.CREATED,
    data,
  });
};

export const getAllHardSkillsController: IController = async (req, res) => {
  const paginatQuery = req.query as unknown as {
    page: string;
    perPage: string;
  };
  const data = await getHardSkills(parsePaginationParams(paginatQuery));

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    message: `page: ${paginatQuery.page}, has ${paginatQuery.perPage} elements`,
    ...data,
  });
};

export const deleHArdSkillController: IController = async (req, res) => {
  const { _id } = req.params as unknown as { _id: string };
  const resp = await deleteHardSkill(_id);
  if (!resp) throw new InternalServerError('hard skill not exist');
  res.status(HttpCode.NO_CONTENT).send();
};

export const getHardSkillsListByIdController: IController = async (req, res) => {
  const { idArr } = req.query as unknown as { idArr: string };
  const arr = JSON.parse(idArr);
  if (!arr) throw new BadRequest('idArr must be array');
  const data = await getSomeHardSkillsByIds(arr);

  res.status(HttpCode.OK).json({ status: HttpCode.OK, data });
};
