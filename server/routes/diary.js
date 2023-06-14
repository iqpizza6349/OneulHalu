const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { diaries, diary, findDiary, saveDiary, updateDiary, deleteDiary, afterUploadImage } = require('../controllers/diary');

const router = express.Router();

try {
    fs.readdirSync("uploads");
} catch (err) {
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        }, filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }
});

router.use(corsWhenDomainMatches);

router.get('', verifyToken, diaries);

router.post("/img", apiLimiter, verifyToken, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.get('/diary', verifyToken, diary);

router.get('/:no', findDiary);

router.post('', apiLimiter, verifyToken, upload2.none(), saveDiary);

router.patch('/:no', apiLimiter, verifyToken, updateDiary);

router.delete('', apiLimiter, verifyToken, deleteDiary);

module.exports = router;
