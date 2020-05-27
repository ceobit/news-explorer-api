// Здесь буду подключать другие обработчики ошибок
const NotFoundError = require('./notFoundError');
const UnauthorizedError = require('./unauthorizedError');
const Forbidden = require('./forbidden');
const Conflict = require('./conflict');

module.exports = {
  NotFoundError, UnauthorizedError, Forbidden, Conflict,
};
