require('dotenv').config();

const PORT = process.env.PORT || 3000;
module.exports.PORT = PORT;
const dbURI = 'mongodb://localhost:27017/newsdb';
module.exports.dbURI = dbURI;

if (process.env.NODE_ENV === 'production') {
  module.exports.SECRET_KEY = process.env.SECRET_KEY;
} else {
  module.exports.SECRET_KEY = 'secret key';
}
