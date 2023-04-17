const express = require('express');

const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { register, login } = require('../controllers/member');

const router = express.Router();

router.use(corsWhenDomainMatches);

router.post('/register', register);

router.post('/login', apiLimiter, login);

module.exports = router;
