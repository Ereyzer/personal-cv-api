import { InfoCollection } from '../db/models/info';
import { IPayloadSimpleInfo } from '../interfaces/interface_controlers';

export const getInfo = async () => {
  const info = await InfoCollection.findById(1);
  return info;
};

export const updateSimpleFildInfo = async (
  payload: IPayloadSimpleInfo,
  options = {}
): Promise<IPayloadSimpleInfo | null> => {
  const data: IPayloadSimpleInfo | null = await InfoCollection.findByIdAndUpdate(1, payload, {
    new: true,
    strict: true,
    runValidators: true,
    ...options,
  });

  return data;
};
