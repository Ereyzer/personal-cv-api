import { HttpCode } from '../config/constants';
import { BadRequest, InternalServerError } from '../config/err-const';
import { IController } from '../interfaces/interface_controlers';
import { updateAvatar } from '../services/files';

export const uploadAvatar: IController = async (req, res, next) => {
  const avatar = req.file;

  const name = avatar?.filename;
  if (!name) throw new BadRequest();

  const data = await updateAvatar(name);
  if (!data) throw new InternalServerError();

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data: {
      url: data.avatar,
    },
  });
  return;
};
