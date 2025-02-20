import { getInfo } from '../services/info.ts';
import { HttpCode } from '../config/constants.ts';
import { IController } from './interface_controlers.ts';

export const getAllInfoController: IController = async (_req, res, next) => {
  const data = await getInfo();
  if (!data) {
    next(new Error('info not exist'));
    return;
  }

  res.status(HttpCode.OK).json({
    data,
  });
};
