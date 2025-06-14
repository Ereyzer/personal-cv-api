import { NextFunction, Request, Response } from 'express';

import mongoose, { Document } from 'mongoose';

export interface IController {
  (req: Request, res: Response, next: NextFunction): Promise<void | never>;
}

// export type EInfoSimpleFields =
//   | '_id'
//   | 'avatar'
//   | 'contact_email'
//   | 'resume_file'
//   | 'likedin'
//   | 'github'
//   | 'instagram'
//   | 'facebook'
//   | 'phone';

// export type TInfo = Record<EInfoFields, string>;
// export type IPayloadSimpleInfo = Partial<Record<EInfoSimpleFields, string>>;

export interface IPayloadSimpleInfo {
  [key: string]: string;
  // avatar?: string;
  // contact_email?: string;
  // resume_file?: string;
  // likedin?: string;
  // github?: string;
  // instagram?: string;
  // facebook?: string;
  // phone?: string;
}

export interface IPayloadLangInfo {
  intro?: {
    en?: string;
    uk?: string;
  };
  about?: {
    en?: string;
    uk?: string;
  };
}

export interface IInfo {
  _id?: number;
  intro?: {
    en: string;
    uk: string;
  };
  about?: {
    en: string;
    uk: string;
  };
  avatar?: string;
  contact_email?: string;
  resume_file?: string;
  likedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  phone?: string;
}

export interface ISvgDbData {
  buffer: Buffer;
  name: string;
}

export interface ISvgDbDataCollection extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  buffer: mongoose.Schema.Types.Buffer;
  name: string;
}

export enum ELanguage {
  EN = 'EN',
  UK = 'UK',
}

export interface ISoftSkill {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  text: string;
  icon: mongoose.Schema.Types.ObjectId | null;
}

export interface IPaginationResp {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  data: mongoose.Document[];
}

export interface IHardSkill {
  _id: mongoose.Schema.Types.ObjectId;
  image: mongoose.Schema.Types.String | null;
  title: mongoose.Schema.Types.String;
}

// export interface IRequestWithUser extends Request {
//   user: mongoose.Document;
// }
