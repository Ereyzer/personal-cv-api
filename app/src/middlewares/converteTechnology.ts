import { Imiddlware } from '../interfaces/interfaces_middlwares.ts';

export const converTechnology: Imiddlware = async (req, res, next) => {
  const body = req.body;
  if (!body.technology) {
    next();
    return;
  }
  body.technology = [...JSON.parse(body.technology)];
  next();
};
