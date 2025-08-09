import mongoose from 'mongoose';
import { InfoCollection } from '../db/models/info.ts';
import { QueryOptions } from 'mongoose';
import { InternalServerError } from '../config/err-const.ts';
import { getInfo } from './info.ts';
import { IInfo } from '../interfaces/interface_controlers.ts';

export const updateResumeService = async (
  buffer: Buffer<ArrayBufferLike>,
  name: string,
  options: QueryOptions = {}
): Promise<mongoose.Document | never> => {
  const data = await InfoCollection.findByIdAndUpdate(
    1,
    { resume_file: { buffer, name } },
    {
      new: true,
      strict: true,
      runValidators: true,
      ...options,
    }
  );

  if (!data) throw new InternalServerError('did nod save');
  return data;
};

export const getResumeService = async (): Promise<IInfo | never> => {
  const data = await getInfo();
  if (!data) throw new InternalServerError('problem find info');
  return data;
};

export const deleteResumeService = async (): Promise<null | never> => {
  const data = await InfoCollection.findByIdAndUpdate(
    1,
    {
      resume_file: { buffer: null, name: null },
    },
    {
      new: true,
      strict: true,
      runValidators: true,
    }
  );

  if (!data) throw new InternalServerError();
  return null;
};
