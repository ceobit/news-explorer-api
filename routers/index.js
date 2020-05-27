const router = require('express').Router();

const routerUsers = require('./users');
const routerArticles = require('./articles');
const routerAuth = require('./auth');

const auth = require('../middlewares/auth');

router.use(auth, routerUsers);
router.use(auth, routerArticles);
router.use(routerAuth);

module.exports = router;
