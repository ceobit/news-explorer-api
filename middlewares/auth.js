const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { SECRET_KEY } = require('../config');
const { ErrorAuthorizationMessage } = require('../errors/errorsMessages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const cookie = req.cookies.jwt;

  if (!cookie) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError(ErrorAuthorizationMessage));
    }
  }
  const token = cookie || authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(ErrorAuthorizationMessage));
  }
  req.user = payload;
  return next();
};
