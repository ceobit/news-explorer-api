const { Joi } = require('celebrate');
const validator = require('validator');

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
        return helpers.message('Ссылка имеет не верный формат');
      }),
    image: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Ссылка имеет не верный формат');
      }),
    date: Joi.string()
      .required(),
  }),
};

const schemaValidateArticleId = {
  params: Joi.object().keys({
    articleId: Joi.string()
      .alphanum().length(24),
  }),
};

module.exports = {
  schemaCreateArticle,
  schemaValidateArticleId,
};
