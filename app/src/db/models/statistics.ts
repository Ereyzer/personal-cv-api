import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const StatisticsSchema = new Schema(
  {
    // TODO: id - language
    _id: {
      type: mongoose.Schema.Types.String,
      require: true,
      auto: false,
    },
    opened: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    dowloadresume: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    sendemail: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    openlinkedin: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    openfacebook: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    openinstagram: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    opentelegram: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
    opengithub: {
      type: mongoose.Schema.Types.Int32,
      require: true,
      default: 0,
    },
  },
  { timestamps: true, collection: 'statistics' }
);

export const StatisticsCollection = mongoose.model('statistics', StatisticsSchema);
