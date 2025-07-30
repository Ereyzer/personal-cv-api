import { UnauthorizedError } from '../config/err-const.ts';
import { IController } from '../interfaces/interface_controlers.ts';
// import { getUser } from '../services/auth.ts';
import { checkAccessToken } from '../services/session.ts';

export const authenticate: IController = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log('try auth');

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
    // TODO: if I had more users;
    // const { userId } =
    await checkAccessToken(token);
    // const user = await getUser(userId);
    // if (!user) {
    //   next(new UnauthorizedError());
    //   return;
    // }
    // interface IRequestWithUser extends Request {
    //   user: typeof user;
    // }
    // (req as unknown as IRequestWithUser).user = user;
    console.log('good');

    next();
  } catch (error) {
    next(error);
  }
};
