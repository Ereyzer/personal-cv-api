import { model, Schema } from 'mongoose';

const SessionsSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      require: true,
      auto: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'users',
    },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    accessTokenValidUntil: { type: Date, require: true },
    refreshTokenValidUntil: { type: Date, require: true },
  },
  { timestamps: true, versionKey: false }
);

export const SessionsCollection = model('sessions', SessionsSchema);
