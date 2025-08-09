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
import { fromBlobToFile, fromFileToBlob } from '../utils/resumeBlobParser.ts';
import { deleteResumeService, getResumeService, updateResumeService } from '../services/resume.ts';

export const uploadAvatar: IController = async (req, res) => {
  const avatar: Express.Multer.File | undefined = req.file;
  // let name = avatar?.filename;
  if (!avatar) throw new BadRequest();
  const imgLink = await saveImageToCloudinary(avatar, 'fullAvatar');
  // const { name, webViewLink } = await uploadFileToDrive(avatar);

  const data = await updateAvatar(imgLink, 'full');
  if (!data) throw new InternalServerError();

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

export const addResumeController: IController = async (req, res) => {
  const resume: Express.Multer.File | undefined = req.file;
  console.log(resume);

  if (!resume) throw new BadRequest('resume is undefined');
  const blob = await fromFileToBlob(resume.path);
  await updateResumeService(blob, resume.originalname);

  res.status(HttpCode.CREATED).json({
    message: 'resume was updated',
    status: HttpCode.CREATED,
  });
};

export const getResumeController: IController = async (req, res) => {
  const { resume_file } = await getResumeService();
  if (!resume_file) {
    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: HttpCode.NOT_FOUND, message: 'resume not found' });
    return;
  }
  if (!resume_file.buffer) {
    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: HttpCode.NOT_FOUND, message: 'resume not found' });
    return;
  }

  const filePath = await fromBlobToFile(resume_file.buffer, resume_file.name);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.setHeader('Content-Disposition', `attachment; filename="${resume_file.name}"`);

  res.status(HttpCode.OK).sendFile(filePath);
};

export const deleteResumeController: IController = async (req, res) => {
  const response = await deleteResumeService();
  if (!response) {
    res.status(HttpCode.NO_CONTENT).send();
    return;
  }
  res.status(HttpCode.CONFLICT).send();
};
