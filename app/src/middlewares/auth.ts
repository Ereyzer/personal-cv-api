import { UnauthorizedError } from '../config/err-const.ts';
import { IController } from '../interfaces/interface_controlers.ts';
import { checkAccessToken } from '../services/session.ts';

export const authenticate: IController = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(new UnauthorizedError('Please provide Authorization header'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(new UnauthorizedError('Auth header should be of type Bearer'));
    return;
  }
  try {
    await checkAccessToken(token);

    next();
  } catch (error) {
    next(error);
  }
};
