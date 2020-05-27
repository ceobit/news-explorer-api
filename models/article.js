const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  date: {
    type: String,
    required: true,
  },
});

articleSchema.path('link').validate((link) => validator.isURL(link), 'Введите ссылку в правильном формате');
articleSchema.path('image').validate((image) => validator.isURL(image), 'Введите ссылку в правильном формате');

module.exports = mongoose.model('article', articleSchema);
