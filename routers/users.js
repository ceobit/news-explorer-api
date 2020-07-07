const routerUsers = require('express').Router();
const { getUser } = require('../controllers/users');

routerUsers.get('/users/me', getUser);

module.exports = routerUsers;
