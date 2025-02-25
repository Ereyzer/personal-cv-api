import { NextFunction, Request, Response } from 'express';

export interface IController {
  (req: Request, res: Response, next: NextFunction): Promise<void | never>;
}

export interface IPayloadSimpleInfo {
  [key: string]: string;
  // avatar?: string;
  // contact_email?: string;
  // resume_file?: string;
  // likedin?: string;
  // github?: string;
  // instagram?: string;
  // facebook?: string;
  // skype?: string;
}
// interface IPayloadSimpleInfo {
//   _id?: number;
//   intro?: {
//     en: string;
//     uk: string;
//   };
//   about?: {
//     en: string;
//     uk: string;
//   };
//   avatar?: string;
//   contact_email?: string;
//   resume_file?: string;
//   likedin?: string;
//   github?: string;
//   instagram?: string;
//   facebook?: string;
//   skype?: string;
// }
