import { getInfo, updateSimpleFildInfo } from '../services/info.ts';
import { HttpCode } from '../config/constants.ts';
import { IController, IPayloadSimpleInfo } from '../interfaces/interface_controlers.ts';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';
import { simpleFieldsSchema } from '../validation/info.ts';
import Joi from 'joi';

export const getAllInfoController: IController = async (_req, res) => {
  const data = await getInfo();
  if (!data) throw new InternalServerError();

  res.status(HttpCode.OK).json({
    status: HttpCode.OK,
    data,
  });
};
// type T = {field: keyof IPayloadSimpleInfo};
export const patchInfoController: IController = async (req, res, next) => {
  const { field } = req.params;
  const body = req.body;
  const payload: IPayloadSimpleInfo = { [`${field}`]: body.value };

  const isWrongField: Joi.ValidationError | undefined = simpleFieldsSchema.validate(payload, {
    abortEarly: true,
  }).error;

  if (isWrongField) throw new UnprocessableEntityError(isWrongField.message);

  const data: IPayloadSimpleInfo | null = await updateSimpleFildInfo(payload, { fields: field });

  if (!data) throw new InternalServerError('can`t update info');

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data,
    field,
  });

  return;
};
