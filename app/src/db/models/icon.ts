import mongoose, { Schema } from 'mongoose';
import { ISvgDbDataCollection } from '../../interfaces/interface_controlers.ts';

const IconSchema = new mongoose.Schema<ISvgDbDataCollection>(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      require: true,
      auto: true,
    },
    name: {
      type: Schema.Types.String,
      require: true,
    },
    buffer: {
      type: Schema.Types.Buffer,
      require: true,
    },
  },
  {
    collection: 'icons',
    timestamps: true,
  }
);
export const IconCOllection = mongoose.model('Icon', IconSchema);
