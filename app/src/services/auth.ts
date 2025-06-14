import mongoose from 'mongoose';

import { UserCollection } from '../db/models/user.ts';
import { closeSession } from './session.ts';

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

export const updatePassword = async (
  _id: string,
  password: string
): Promise<mongoose.Document | null> => {
  return await UserCollection.findByIdAndUpdate(_id, { password }, { new: true });
};

export const logoutUser = async (sessionId: string) => {
  await closeSession(sessionId);
};
