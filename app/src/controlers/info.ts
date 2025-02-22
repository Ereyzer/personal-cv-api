import { getInfo } from '../services/info.ts';
import { HttpCode } from '../config/constants.ts';
import { IController } from '../interfaces/interface_controlers.ts';
import { InternalServerError } from '../config/err-const.ts';

export const getAllInfoController: IController = async (_req, res) => {
  const data = await getInfo();
  if (!data) {
    throw new InternalServerError();
  }

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    data,
  });
};
