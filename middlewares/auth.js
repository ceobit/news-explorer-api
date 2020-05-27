const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const cookie = req.cookies.jwt;

  if (!cookie) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError('Авторизация не выполнена'));
    }
  }
  const token = cookie || authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Авторизация не выполнена'));
  }
  req.user = payload;
  return next();
};
