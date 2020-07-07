const { Joi } = require('celebrate');
const validator = require('validator');
const { ErrorLinkMessage, ErrorIdMessage } = require('../../errors/errorsMessages');

const schemaCreateArticle = {
  body: Joi.object().keys({
    keyword: Joi.string()
      .required(),
    title: Joi.string()
      .required(),
    text: Joi.string()
      .required(),
    source: Joi.string()
      .required(),
    link: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(ErrorLinkMessage);
      }),
    image: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(ErrorLinkMessage);
      }),
    date: Joi.string()
      .required(),
  }),
};

const schemaValidateArticleId = {
  params: Joi.object().keys({
    articleId: Joi.string()
      .alphanum().length(24)
      .custom((value, helpers) => {
        if (value.match(/^[0-9a-fA-F]{24}$/)) {
          return value;
        }
        return helpers.message(ErrorIdMessage);
      }),
  }),
};

module.exports = {
  schemaCreateArticle,
  schemaValidateArticleId,
};
