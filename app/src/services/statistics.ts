import { InternalServerError } from '../config/err-const.ts';
import { StatisticsCollection } from '../db/models/statistics.ts';
import { ELanguage } from '../interfaces/interface_controlers.ts';
import { statisticsFieldsEnum } from '../interfaces/services.ts';

const upsertDocument = async (language: ELanguage) => {
  const document = new StatisticsCollection({ _id: language });
  return await document.save();
};

export const getStatisticsService = async () => {
  const data = await StatisticsCollection.find();

  return data;
};

export const updateStatistics = async (act: statisticsFieldsEnum, language: ELanguage) => {
  const oldData = (
    (await StatisticsCollection.findById(language)) || (await upsertDocument(language))
  ).toJSON() as unknown as { [act]: number };
  if (!oldData) throw new InternalServerError('problen with statistic');
  const newData = await StatisticsCollection.findByIdAndUpdate(language, {
    [act]: oldData[act] + 1,
  });

  return newData;
};
