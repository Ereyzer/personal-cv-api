import { InternalServerError } from '../config/err-const.ts';
import { getInfo } from './info.ts';

export const contactBymailService = async (): Promise<{ contact_email: string } | never> => {
  const info = await getInfo({ _id: 0, contact_email: 1 });
  if (!info) throw new InternalServerError('not Info');
  return info as unknown as { contact_email: string };
};
