import mongoose from 'mongoose';

import { UserCollection } from '../db/models/user.ts';

export const registerUser = async (user: {
  name?: string;
  email: string;
  password: string;
}): Promise<mongoose.Document> => {
  return await UserCollection.create(user);
};

export const getUser = async (email: string): Promise<mongoose.Document | null> => {
  return await UserCollection.findOne({ email });
};
