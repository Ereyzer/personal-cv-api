import { QueryOptions } from 'mongoose';
import { InfoCollection } from '../db/models/info.ts';
import { IInfo, IPayloadLangInfo, IPayloadSimpleInfo } from '../interfaces/interface_controlers.ts';

export const getInfo = async (projection: object = {}) => {
  const info: IInfo | null = await InfoCollection.findById(1, projection);

  return info;
};

export const updateSimpleFildInfo = async (
  payload: IPayloadSimpleInfo,
  options: QueryOptions = {}
): Promise<IPayloadSimpleInfo | null> => {
  const data: IPayloadSimpleInfo | null = await InfoCollection.findByIdAndUpdate(1, payload, {
    new: true,
    strict: true,
    runValidators: true,
    ...options,
  });

  return data;
};

export const updateLangFieldInfo = async (
  payload: IPayloadLangInfo,
  options: QueryOptions = {}
): Promise<IPayloadLangInfo | null> => {
  const info: IInfo | null = await getInfo();
  if (!info) return null;
  const fieldName = Object.keys(payload)[0] as unknown as keyof IInfo;

  const oldObj = info[`${fieldName}`] as unknown as object;
  const newObj = payload[
    `${Object.keys(payload)[0] as unknown as keyof IPayloadLangInfo}`
  ] as unknown as object;

  return await InfoCollection.findByIdAndUpdate(
    1,
    { [`${fieldName}`]: { ...oldObj, ...newObj } },
    {
      new: true,
      strict: true,
      runValidators: true,
      ...options,
    }
  );
};
