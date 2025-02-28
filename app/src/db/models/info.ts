// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const defaultUK = 'поки нічого!';
const defaultEN = 'nothing yet!';

const InfoSchema = new Schema(
  {
    _id: {
      type: Number,
      default: 1,
    },
    intro: {
      en: {
        type: String,
        default: defaultEN,
      },
      uk: {
        type: String,
        default: defaultUK,
      },
    },
    about: {
      en: {
        type: String,
        default: defaultEN,
      },
      uk: {
        type: String,
        default: defaultUK,
      },
    },
    avatar: {
      type: Buffer,
      default: null,
    },
    contact_email: {
      type: String,
      default: null,
    },
    resume_file: {
      type: Buffer,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  { collection: 'info', timestamps: true }
);

export const InfoCollection = mongoose.model('Info', InfoSchema);
