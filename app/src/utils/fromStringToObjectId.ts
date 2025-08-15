import mongoose from 'mongoose';

export const fromStringToObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};
