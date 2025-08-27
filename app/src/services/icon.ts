import mongoose from 'mongoose';
import { Express } from 'express';

import { fromSvgToBinary } from '../utils/svgTobinaryConverter.ts';
import { InternalServerError } from '../config/err-const.ts';
import { IconCOllection } from '../db/models/icon.ts';
import { ISvgDbData, ISvgDbDataCollection } from '../interfaces/interface_controlers.ts';

export const getAllIcons = async (): Promise<ISvgDbDataCollection[]> => {
  const icons: ISvgDbDataCollection[] = await IconCOllection.find();

  return icons;
};

export const getIconById = async (id: string): Promise<ISvgDbDataCollection | null> =>
  await IconCOllection.findById(id);

export const addIcons = async <T extends { _id: mongoose.Schema.Types.ObjectId; name: string }>(
  icons: Express.Multer.File[]
): Promise<T[] | never> => {
  const binaryIconsPromises: Promise<ISvgDbData>[] = [];
  for (let i = 0; i < icons.length; i++) {
    binaryIconsPromises[i] = new Promise(resolve => {
      resolve(
        (async () => {
          return {
            buffer: await fromSvgToBinary(icons[i].path),
            name: icons[i].filename,
          };
        })()
      );
    });
  }

  try {
    const binaryIcons: ISvgDbData[] | never = await Promise.all(binaryIconsPromises);
    const response: T[] = [];
    for (const el of binaryIcons) {
      const doc = new IconCOllection({
        ...el,
      });
      await doc.save();
      response.push({ name: doc.name, _id: doc._id } as T);
    }
    return response;
  } catch (e) {
    console.log(e);

    throw new InternalServerError('We cant add icons');
  }
};
