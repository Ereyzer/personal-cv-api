import mongoose from 'mongoose';

export const SvgCOllection = mongoose.model(
  'svg',
  new mongoose.Schema(
    {
      _id: {
        type: mongoose.Types.ObjectId,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
      buffer: {
        type: Buffer,
        require: true,
      },
    },
    {
      collaction: 'svgs',
      timestamps: true,
    }
  )
);
