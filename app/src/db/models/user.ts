import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      requaire: true,
      auto: true,
    },
    name: {
      type: String,
      require: false,
      default: 'Delulu',
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', usersSchema);
