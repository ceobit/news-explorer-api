const Article = require('../models/article');
const { NotFoundError, Forbidden } = require('../errors/errors');
const { DataNotFoundMessage, NotAccessMessage, DataDeletedMessage } = require('../errors/errorsMessages');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(() => new NotFoundError(DataNotFoundMessage))
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, source, link, image, date,
  } = req.body;
  Article.create({
    keyword, title, text, source, link, image, date, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .orFail(() => new NotFoundError(DataNotFoundMessage))
    .then((articles) => {
      if (!articles.owner.equals(req.user._id)) {
        throw new Forbidden(NotAccessMessage);
      }
      return Article.findByIdAndRemove({ _id: articleId })
        .then(() => res.send({ message: DataDeletedMessage }));
    })
    .catch(next);
};
