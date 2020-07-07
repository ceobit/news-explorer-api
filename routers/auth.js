const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  login, createUser,
} = require('../controllers/users');
const { accountSignIn, accountSignUp } = require('../models/validations');

router.post('/signin', celebrate(accountSignIn), login);
router.post('/signup', celebrate(accountSignUp), createUser);

module.exports = router;
