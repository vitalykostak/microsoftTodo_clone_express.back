import ApiError from '../exceptions/api-exception.js';

function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  console.log(err);

  res.status(500).json({ message: 'Непредвиденная ошибка' });
}

export default errorMiddleware;
