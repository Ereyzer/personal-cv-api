import { InternalServerError } from '../config/err-const.ts';
import { InfoCollection } from '../db/models/info.ts';
import { rmFileFromUploadDir, saveFileToUploadDir } from '../utils/FileInUploadDir.ts';

type AvatarDoc = { avatar: string | null } | null;
type AvatarService = AvatarDoc | never;

export const updateAvatar = async (fileName: string): Promise<AvatarService> => {
  const url: string = await saveFileToUploadDir(fileName);
  const oldData: AvatarDoc = await InfoCollection.findById(1, 'avatar');

  const data: AvatarDoc = await InfoCollection.findByIdAndUpdate(
    1,
    { avatar: url },
    { new: true, strict: true, run: true, fields: ['avatar'] }
  );

  if (!data) {
    rmFileFromUploadDir(url);
    throw new InternalServerError('file did not dounload');
  }

  if (!oldData?.avatar) return data;

  rmFileFromUploadDir(oldData.avatar);
  return data;
};
