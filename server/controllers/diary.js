const { findAllByAuthor, findDiary, save, findByNo, exists, update, deleteByNo, updateWithImage } = require('../dao/diary');

const { v4 } = require('uuid');

exports.afterUploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}` });
};

exports.diaries = async (req, res, next) => {
    const member = res.locals.decoded;

    const year = parseInt(req.query.year, 10);
    const month = parseInt(req.query.month, 10) - 1;

    const end = new Date(year, month, 1);

    const diaries = await findAllByAuthor(member.id, `${year}-${month}-01`,
                                                end.toISOString().substring(0, 10));
    return res.status(200).json({
        data: diaries
    });
};

exports.diary = async (req, res, next) => {
    const member = res.locals.decoded;
    const year = parseInt(req.query.year, 10);
    const month = parseInt(req.query.month, 10) - 1;
    const day = parseInt(req.query.day, 10);
    const date = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
    const diary = await findDiary(member.id, date.toISOString().substring(0, 10));
    return res.status(200).json({
        diaryNo: diary.diaryNo,
        authorId: diary.authorId,
        content: diary.content,
        emoji: diary.emoji,
        wroteDate: diary.wroteDate,
        image: diary.image
    });
};

exports.findDiary = async (req, res, next) => {
    const diary = await findByNo(req.params.no);
    return res.status(200).json({
        diaryNo: diary.diaryNo,
        authorId: diary.authorId,
        content: diary.content,
        emoji: diary.emoji,
        wroteDate: diary.wroteDate,
        image: diary.image
    });
}

exports.saveDiary = (req, res, next) => {
    const { content, wrote_at, emoji } = req.body;
    const date = new Date(wrote_at);
    const member = res.locals.decoded;

    const wrote = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() + 1);
    save(v4(), member.id, content, emoji, wrote.toISOString().substring(0, 10), req.body.url);
    return res.status(201).json({
        message: "good"
    });
};

exports.updateDiary = (req, res, next) => {
    const { content, emoji } = req.body;
    const member = res.locals.decoded;
    const no = req.params.no;

    if (exists(member.id, no)) {
        if (req.body.url) {
            updateWithImage(no, content, emoji, req.body.url);
        }
        else {
            update(no, content, emoji);
        }

        return res.status(200).json({
            message: "complete"
        });
    }
    else {
        return res.status(404).json({
            message: "cannot found diary"
        });
    }
};

exports.deleteDiary = (req, res, next) => {
    const member = res.locals.decoded;
    const no = req.query.no;

    if (exists(member.id, no)) {
        deleteByNo(no);
        return res.status(204).json({});
    }
    else {
        return res.status(404).json({
            message: "cannot found diary"
        });
    }
};
