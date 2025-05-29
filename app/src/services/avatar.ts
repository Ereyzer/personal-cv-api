import { InternalServerError } from '../config/err-const.ts';

import { InfoCollection } from '../db/models/info.ts';

type AvatarDoc = { avatar: string | null } | null;
type AvatarService = AvatarDoc | never;

export const updateAvatar = async (fileUrl: string): Promise<AvatarService> => {
  // const url: string = await saveFileToUploadDir(fileName);
  const oldData: AvatarDoc = await InfoCollection.findById(1, 'avatar');

  const data: AvatarDoc = await InfoCollection.findByIdAndUpdate(
    1,
    { avatar: fileUrl },
    { new: true, strict: true, run: true, fields: ['avatar'] }
  );

  if (!data) {
    throw new InternalServerError('file did not dounload');
  }

  if (!oldData?.avatar) return data;

  return data;
};
