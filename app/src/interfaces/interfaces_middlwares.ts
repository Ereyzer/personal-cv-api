import Joi from 'joi';
import { IController } from './interface_controlers.ts';
import { Response, Request, NextFunction } from 'express';

export interface IVadatorMiddlware {
  (schema: Joi.ObjectSchema): IController;
}

export interface Imiddlware {
  (req: Request, res: Response, next: NextFunction): Promise<void | never>;
}
//  TODO: ???
