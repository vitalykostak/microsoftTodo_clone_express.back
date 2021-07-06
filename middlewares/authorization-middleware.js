import tokenService from '../service/token-service.js';

import ApiError from '../exceptions/api-exception.js';

function authorizationMiddleware(req, res, next) {
  if (req.method === 'OPTION') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return next(
        ApiError.Unauthorized('Аутентификационный токен не предоставлен')
      );
    }

    const decodedToken = tokenService.verifyAccesToken(token);
    if (!decodedToken) {
      return next(ApiError.Unauthorized('Пользователь не авторизован'));
    }

    req.$requestor = { ...decodedToken };
    next();
  } catch (e) {
    next(ApiError.Unauthorized('Пользователь не авторизован'));
  }
}

export default authorizationMiddleware;
