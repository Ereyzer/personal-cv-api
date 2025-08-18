import mongoose from 'mongoose';

export interface IprojectPayload {
  _id?: string;
  image?: {
    url: string;
    public_id: string;
  };
  link?: string;
  github?: string;
  technology?: string[];
  title?: string;
  description?: string;
}

export interface IprojectReturn extends Omit<IprojectPayload, '_id' | 'technology'> {
  _id: mongoose.Types.ObjectId;
  technology: mongoose.Types.ObjectId[];
}

export enum statisticsFieldsEnum {
  opened = 'opened',
  dowloadresume = 'dowloadresume',
  sendemail = 'sendemail',
  openlinkedin = 'openlinkedin',
  openfacebook = 'openfacebook',
  openinstagram = 'openinstagram',
  opentelegram = 'opentelegram',
  opengithub = 'opengithub',
}
