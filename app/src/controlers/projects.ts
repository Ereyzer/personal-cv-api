import { HttpCode } from '../config/constants.ts';
import { BadRequest, InternalServerError, NotFoundError } from '../config/err-const.ts';
import { ELanguage, IController } from '../interfaces/interface_controlers.ts';
import {
  createProjectService,
  deleteOneProjectService,
  getAllProjectsByLanguageService,
  getOneProjectService,
  updateProjectLenguageService,
  updateProjectService,
} from '../services/projects.ts';
import { parsePaginationParams } from '../utils/parsePaginationParams.ts';
import { removeImageFromCloudinary, saveImageToCloudinary } from '../utils/saveFileToCloudinary.ts';

export const getAllProjectsController: IController = async (req, res) => {
  const { language, ...paginatQuery } = req.query as unknown as {
    page: string;
    perPage: string;
    language: ELanguage;
  };

  const data = await getAllProjectsByLanguageService({
    ...parsePaginationParams(paginatQuery),
    language,
  });

  res.status(HttpCode.OK).json({ status: HttpCode.OK, ...data });
};

export const createProjectController: IController = async (req, res) => {
  const { ...body } = req.body;
  const file = req.file;
  let data;

  if (!file) {
    data = await createProjectService(body);
  } else {
    const image = await saveImageToCloudinary(file, file.filename);
    data = await createProjectService({
      ...body,
      image: { url: image, public_id: file.filename },
    });
  }

  res.status(HttpCode.CREATED).json({ status: HttpCode.CREATED, data });
};

export const updateProjectController: IController = async (req, res) => {
  const { ...body } = req.body;
  const { _id } = req.params;
  const file = req.file;
  const payload = { ...body };
  const oldData = await getOneProjectService(_id);
  if (!oldData) throw new NotFoundError(`project with id: "${_id}" not exist`);
  if (file) {
    if (oldData.image?.public_id) {
      await removeImageFromCloudinary(oldData.image?.public_id);
    }
    const cloudUrl = await saveImageToCloudinary(file, file.filename);

    payload.image = { url: cloudUrl, public_id: file.filename };
  }
  const data = await updateProjectService(payload, _id);

  res.status(HttpCode.CREATED).json({ status: HttpCode.CREATED, data });
};

export const updateProjectLangugeController: IController = async (req, res) => {
  const { language, title, description } = req.body;
  const { _id } = req.params;
  if (!title && !description) throw new BadRequest('title or description must be not undefined');
  const oldData = await getOneProjectService(_id);
  if (!oldData) throw new NotFoundError(`project with id: "${_id}" not exist`);
  const payload = { title, description };
  const response = await updateProjectLenguageService(language, payload, _id);
  if (!response) throw new InternalServerError('somesing went wrong');
  const data = { ...oldData, ...response };
  res.status(HttpCode.CREATED).json({ status: HttpCode.CREATED, data });
};

export const deleteOneProjectController: IController = async (req, res) => {
  const { _id } = req.params;
  const project = await getOneProjectService(_id);
  if (!project) throw new NotFoundError(`project with id: "${_id}" not exist`);
  if (project.image?.url) {
    removeImageFromCloudinary(project.image.public_id);
  }
  deleteOneProjectService(_id);
  res.status(HttpCode.NO_CONTENT).json({ status: HttpCode.NO_CONTENT });
};
