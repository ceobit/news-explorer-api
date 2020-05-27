const Article = require('../models/article');
const { NotFoundError, Forbidden } = require('../errors/errors');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
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
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
    .then((articles) => {
      if (!articles.owner.equals(req.user._id)) {
        throw new Forbidden('Нет прав на удаление статьи');
      }
      return Article.findByIdAndRemove({ _id: articleId })
        .then(() => res.send({ message: 'Статья успешно удалена' }));
    })
    .catch(next);
};
