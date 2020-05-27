const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routers = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const limiter = require('./middlewares/rate-limiter');

const { PORT, dbURI } = require('./config');

const app = express();

//  Подключаемся к серверу mongo
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

//  Успешно подключились к БД
mongoose.connection.on('connected', () => {
  console.log(`Mongoose запущен ${dbURI}`);
  app.listen(PORT, () => {
    console.log('Сервер запущен');
  });
});

//  Ошибка подключения к БД
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose ошибка подключения: ${err}`);
});

//  Отключились от БД
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose подключение завершено');
});

//  Заполняем req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(limiter);

app.use(cookieParser());

//  логгер запросов
app.use(requestLogger);

app.use('/', routers);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// логгер ошибок
app.use(errorLogger);

//  Обработчик ошибок celebrate
app.use(errors());

app.use(errorsHandler);
