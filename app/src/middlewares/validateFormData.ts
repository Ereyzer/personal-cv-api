import { IVadatorMiddlware } from '../interfaces/interfaces_middlwares.ts';

export const ValidateFormData: IVadatorMiddlware = schema => async (req, res, next) => {
  const { ...body } = req.body;

  try {
    await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};
