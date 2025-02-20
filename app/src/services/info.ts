import { InfoCollection } from '../db/models/info';

export const getInfo = async () => {
  const info = await InfoCollection.findById(1);
  return info;
};

export const updateInfo = async () => {
  // const Info = await InfoCollection;
  // return Info;
};
