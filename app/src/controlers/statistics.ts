import { HttpCode } from '../config/constants.ts';
import { BadRequest } from '../config/err-const.ts';
import { ELanguage, IController } from '../interfaces/interface_controlers.ts';
import { statisticsFieldsEnum } from '../interfaces/services.ts';
import { getStatisticsService, updateStatistics } from '../services/statistics.ts';

export const getStatisticsController: IController = async (req, res) => {
  const data = await getStatisticsService();

  res.status(HttpCode.OK).json({ status: HttpCode.OK, data });
};

export const updateStatisticsByActController: IController = async (req, res) => {
  const query = req.query as { act: statisticsFieldsEnum; language: string };
  const act: statisticsFieldsEnum = query.act;
  const language: ELanguage = query.language.toUpperCase() as ELanguage;
  if (!act || !language) throw new BadRequest('act must be string');
  if (
    !Object.values(statisticsFieldsEnum).includes(act) ||
    !Object.values(ELanguage).includes(language)
  )
    throw new BadRequest('act must be string');
  await updateStatistics(act, language);
  res.status(HttpCode.NO_CONTENT).send();
};
