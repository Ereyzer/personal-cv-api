import {
  EnProjectsCollection,
  ProjectsCollection,
  UkProjectsCollection,
} from '../db/models/projects.ts';
import { ELanguage } from '../interfaces/interface_controlers.ts';
import { fromStringToObjectId } from '../utils/fromStringToObjectId.ts';
import { IprojectPayload, IprojectReturn } from '../interfaces/services.ts';
import mongoose, { FlattenMaps } from 'mongoose';

import { calculatePaginationData } from '../utils/calculatePaginationData.ts';
import { NotFoundError } from '../config/err-const.ts';

export const getAllProjectsByLanguageService = async ({
  perPage = 5,
  page = 1,
  language = ELanguage.EN,
}): Promise<object> => {
  const skip = (page - 1) * perPage;
  const docs = await ProjectsCollection.find()
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(perPage)
    .exec();

  const IdArray = docs.map(doc => doc._id);

  const [totalItems, en, uk] = await Promise.all([
    await ProjectsCollection.find().countDocuments(),
    await EnProjectsCollection.find({ _id: { $in: IdArray } }),
    await UkProjectsCollection.find({ _id: { $in: IdArray } }),
    // await ProjectsCollection.find().skip(skip).limit(perPage).exec(),
  ]);

  const data = docs.map(doc => {
    interface DocumentProperties {
      title?: string;
      description?: string;
    }
    const docFilter = (prevArr: DocumentProperties[], d: mongoose.Document) => {
      if (!d._id || !doc._id) {
        return prevArr;
      }
      if (d._id.toString() === doc._id.toString()) {
        const obj: DocumentProperties = {};
        if ((d as unknown as { title: string })?.title)
          obj.title = (d as unknown as { title: string }).title;

        if ((d as unknown as { description: string })?.description)
          obj.description = (d as unknown as { description: string }).description;
        return [obj, ...prevArr];
      } else {
        return prevArr;
      }
    };
    const ukrainian = uk.reduce(docFilter, [])[0] || {};
    const english = en.reduce(docFilter, [])[0] || {};
    switch (language) {
      case ELanguage.EN:
        return {
          ...doc.toJSON(),
          title: null,
          description: null,
          ...ukrainian,
          ...english,
        };

      case ELanguage.UK:
        return {
          ...doc.toJSON(),
          title: null,
          description: null,
          ...english,
          ...ukrainian,
        };
      default:
        return { ...doc.toJSON(), title: null, description: null };
    }
  });
  return { ...calculatePaginationData(totalItems, page, perPage), data };
};

export const getOneProjectService = async (id: string): Promise<FlattenMaps<IprojectReturn>> => {
  return (
    await ProjectsCollection.findById(id)
  )?.toJSON() as unknown as FlattenMaps<IprojectReturn>;
};
export const createProjectService = async (
  payload: IprojectPayload
): Promise<FlattenMaps<IprojectReturn>> => {
  const { image, link, github, technology = [] } = payload;
  let project = new ProjectsCollection({
    image,
    link,
    github,
    technology: [...technology.map(fromStringToObjectId)],
  });

  project = await project.save();

  return project.toJSON() as unknown as FlattenMaps<IprojectReturn>;
};

export const updateProjectService = async (
  payload: IprojectPayload,
  _id: string
): Promise<FlattenMaps<IprojectReturn>> => {
  const project = await ProjectsCollection.findByIdAndUpdate(_id, payload, { new: true });
  if (!project) throw new NotFoundError(`${_id} - document not exist`);
  return project.toJSON() as unknown as FlattenMaps<IprojectReturn>;
};

export const updateProjectLenguageService = async (
  language: ELanguage,
  { title, description }: IprojectPayload,
  _id: string
): Promise<FlattenMaps<IprojectReturn>> => {
  let project;
  switch (language) {
    case ELanguage.EN:
      project = await EnProjectsCollection.findByIdAndUpdate(
        _id,
        { title, description },
        { new: true, upsert: true }
      );
      break;

    case ELanguage.UK:
      project = await UkProjectsCollection.findByIdAndUpdate(
        _id,
        { title, description },
        { new: true, upsert: true }
      );
      break;
    default:
      break;
  }
  return project?.toJSON() as unknown as IprojectReturn;
};

export const deleteOneProjectService = async (_id: string): Promise<void> => {
  Promise.all([
    ProjectsCollection.findByIdAndDelete(_id),
    EnProjectsCollection.findByIdAndDelete(_id),
    UkProjectsCollection.findByIdAndDelete(_id),
  ]);
  return;
};
