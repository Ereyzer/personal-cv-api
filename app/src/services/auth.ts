import mongoose from 'mongoose';
import { UserCollection } from '../db/models/user.ts';

export const registerUser = async (user: {
  name?: string;
  email: string;
  password: string;
}): Promise<mongoose.Document> => {
  return await UserCollection.create(user);
};
