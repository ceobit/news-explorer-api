const routerArticles = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaCreateArticle, schemaValidateArticleId } = require('../models/validations');
const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

routerArticles.get('/articles', getAllArticles);
routerArticles.post('/articles', celebrate(schemaCreateArticle), createArticle);
routerArticles.delete('/articles/:articleId', celebrate(schemaValidateArticleId), deleteArticle);

module.exports = routerArticles;
