const errorsHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
  next();
};

module.exports = errorsHandler;
