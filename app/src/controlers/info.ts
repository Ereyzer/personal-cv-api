import { getInfo, updateLangFieldInfo, updateSimpleFildInfo } from '../services/info.ts';
import { HttpCode } from '../config/constants.ts';
import {
  IController,
  IPayloadLangInfo,
  IPayloadSimpleInfo,
} from '../interfaces/interface_controlers.ts';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';
import { langFieldSchema, simpleFieldsSchema } from '../validation/info.ts';
import Joi from 'joi';

export const getAllInfoController: IController = async (_req, res) => {
  const data = await getInfo();
  if (!data) throw new InternalServerError('did not get data');

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
    data: { [`${field}`]: data[`${field}`] },
    field,
  });

  return;
};

export const clearSocialLink: IController = async (req, res, next) => {
  const { field } = req.params;
  const payload = { [`${field}`]: null };
  const data = await updateSimpleFildInfo(payload, { fields: field });
  if (!data) throw new InternalServerError(`can\`t delete this  ${field}`);
  res.status(HttpCode.NO_CONTENT).send();
};

export const patchInfoEnController: IController = async (req, res, next) => {
  const {
    params: { field },
    body: { value },
  } = req;
  const payload: IPayloadLangInfo = {
    [`${field}`]: {
      en: value,
    },
  };
  const isWrongField: Joi.ValidationError | undefined = langFieldSchema.validate(payload, {
    abortEarly: true,
  }).error;

  if (isWrongField) throw new UnprocessableEntityError(isWrongField.message);

  const data: IPayloadLangInfo | null = await updateLangFieldInfo(payload, { fields: field });

  if (!data) throw new InternalServerError('can`t update info');

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data,
    field,
  });
  return;
};

export const patchInfoUkController: IController = async (req, res, next) => {
  const {
    params: { field },
    body: { value },
  } = req;
  const payload: IPayloadLangInfo = {
    [`${field}`]: {
      uk: value,
    },
  };
  const isWrongField: Joi.ValidationError | undefined = langFieldSchema.validate(payload, {
    abortEarly: true,
  }).error;

  if (isWrongField) throw new UnprocessableEntityError(isWrongField.message);

  const data: IPayloadLangInfo | null = await updateLangFieldInfo(payload, { fields: field });

  if (!data) throw new InternalServerError('can`t update info');

  res.status(HttpCode.CREATED).json({
    status: HttpCode.CREATED,
    data,
    field,
  });
  return;
};
// TODO: validator
// TODO: IF
// TODO: db
// TODO: IF
// TODO: res
