const { Joi } = require('celebrate');

const accountSignIn = {
  body: Joi.object().keys({
    email: Joi.string()
      .required().email(),
    password: Joi.string()
      .required().min(8),
  }),
};

module.exports.accountSignIn = accountSignIn;
