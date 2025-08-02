import { InternalServerError } from '../config/err-const.ts';

import { InfoCollection } from '../db/models/info.ts';

type AvatarDoc = {
  avatar: {
    full: string | null;
    cut: string | null;
  } | null;
} | null;
type AvatarService = AvatarDoc | never;

export const updateAvatar = async (
  fileUrl: string,
  size: 'full' | 'cut'
): Promise<AvatarService> => {
  const oldData: AvatarDoc = await InfoCollection.findById(1, 'avatar');
  const avatarDoc: AvatarDoc = {
    avatar: { full: null, cut: null, ...oldData?.avatar, [size]: fileUrl },
  };
  const data: AvatarDoc = await InfoCollection.findByIdAndUpdate(1, avatarDoc, {
    new: true,
    strict: true,
    run: true,
    fields: ['avatar'],
  });

  if (!data) {
    throw new InternalServerError('file did not dounload');
  }

  if (!oldData?.avatar) return data;

  return data;
};
