require('dotenv').config();

const PORT = process.env.PORT || 3000;
module.exports.PORT = PORT;

if (process.env.NODE_ENV === 'production') {
  module.exports.SECRET_KEY = process.env.SECRET_KEY;
  module.exports.dbURI = process.env.dbURI;
} else {
  module.exports.SECRET_KEY = 'secret key';
  module.exports.dbURI = 'mongodb://localhost:27017/newsdb';
}
