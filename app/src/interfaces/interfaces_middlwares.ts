import Joi from 'joi';
import { IController } from './interface_controlers.ts';

export interface IVadatorMiddlware {
  (schema: Joi.ObjectSchema): IController;
}
