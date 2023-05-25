const express = require('express');

const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { diaries, diary, findDiary, saveDiary, updateDiary, deleteDiary } = require('../controllers/diary');

const router = express.Router();

router.use(corsWhenDomainMatches);

router.get('', verifyToken, diaries);

router.get('/diary', verifyToken, diary);

router.get('/:no', findDiary);

router.post('', apiLimiter, verifyToken, saveDiary);

router.patch('/:no', apiLimiter, verifyToken, updateDiary);

router.delete('', apiLimiter, verifyToken, deleteDiary);

module.exports = router;
