import { Express } from 'express';

import { HttpCode } from '../config/constants.ts';
import { BadRequest, InternalServerError, NotFoundError } from '../config/err-const.ts';
import {
  IController,
  ISvgDbData,
  ISvgDbDataCollection,
} from '../interfaces/interface_controlers.ts';
import { updateAvatar } from '../services/avatar.ts';
import { addIcons, getAllIcons, getIconById } from '../services/icon.ts';
import { fromBinaryToSvg, rmTmpFile } from '../utils/svgTobinaryConverter.ts';
import { saveImageToCloudinary } from '../utils/saveFileToCloudinary.ts';

export const uploadAvatar: IController = async (req, res) => {
  console.log('upload func');

  const avatar: Express.Multer.File | undefined = req.file;
  // let name = avatar?.filename;
  if (!avatar) throw new BadRequest();
  const imgLink = await saveImageToCloudinary(avatar, 'fullAvatar');
  // const { name, webViewLink } = await uploadFileToDrive(avatar);

  const data = await updateAvatar(imgLink, 'full');
  if (!data) throw new InternalServerError();
  console.log('good');

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data: {
      url: imgLink,
    },
  });
  return;
};

export const cutAvatar: IController = async (req, res) => {
  const avatar: Express.Multer.File | undefined = req.file;
  if (!avatar) throw new BadRequest();
  const imgLink = await saveImageToCloudinary(avatar, 'cutAvatar');

  const data = await updateAvatar(imgLink, 'cut');
  if (!data) throw new InternalServerError();

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data: {
      url: imgLink,
    },
  });
  return;
};

export const getAllIconController: IController = async (req, res) => {
  const buffers: ISvgDbDataCollection[] = await getAllIcons();
  const data = buffers.map(({ name, _id }) => ({ name, _id }));

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    data,
  });
};

export const getOneIconController: IController = async (req, res) => {
  const { id } = req.params;

  const icon: ISvgDbDataCollection | null = await getIconById(id);

  if (!icon) throw new NotFoundError('not found any icons');
  const { buffer, name } = icon;

  const filePaths: string = await fromBinaryToSvg({ buffer, name } as unknown as ISvgDbData);

  res.status(200).sendFile(filePaths);
  rmTmpFile(filePaths);
};

export const uploadSvgIcons: IController = async (req, res) => {
  const icons: Express.Multer.File[] | undefined = req.files as Express.Multer.File[];
  if (!icons) {
    throw new InternalServerError();
  }
  const data = await addIcons(icons);

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data,
  });
};
