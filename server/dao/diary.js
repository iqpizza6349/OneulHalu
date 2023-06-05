const { connect, close } = require(".");
const Diary = require('../models/Diary');

exports.save = async (diaryNo, authorId, content, emoji, wroteDate, image) => {
    const connection = await connect();
    connection.query(
        `insert into diary (diary_no, author_id, content, emoji, wrote_date, image)
        values ('${diaryNo}', ${authorId}, '${content}', ${emoji}, str_to_date('${wroteDate}', '%Y-%m-%d'), '${image}')`
    );
    close();
};

exports.findAllByAuthor = async (authorId, start, end) => {
    try {
        const connection = await connect();
        return new Promise((resolve, reject) => {
            connection.query(
                `select diary_no as diaryNo, author_id as authorId, content,
                        emoji, wrote_date as wroteDate, image
                from diary
                where author_id = ${authorId}
                    and wrote_date >= str_to_date('${start}', '%Y-%m-%d')
                    and wrote_date <= str_to_date('${end}', '%Y-%m-%d')`,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    let diaries = [];
                    for (let i = 0; i < rows.length; i++) {
                        diaries.push(new Diary(
                            rows[i]?.diaryNo,
                            rows[i]?.authorId,
                            rows[i]?.content,
                            rows[i]?.emoji,
                            rows[i]?.wroteDate,
                            rows[i]?.image
                        ));
                    }
                    resolve(diaries);
                }
            );
            close();
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.findByNo = async (no) => {
    try {
        const connection = await connect();
        return new Promise((resolve, reject) => {
            connection.query(
                `select diary_no as diaryNo, author_id as authorId, content,
                        emoji, wrote_date as wroteDate, image
                from diary
                where diary_no = '${no}'`,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    const diary = new Diary(
                        rows[0]?.diaryNo,
                        rows[0]?.authorId,
                        rows[0]?.content,
                        rows[0]?.emoji,
                        rows[0]?.wroteDate,
                        rows[0]?.image
                    );
                    resolve(diary);
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.findDiary = async (authorId, date) => {
    try {
        const connection = await connect();
        return new Promise((resolve, reject) => {
            connection.query(
                `select diary_no as diaryNo, author_id as authorId, content,
                        emoji, wrote_date as wroteDate, image
                from diary
                where author_id = ${authorId}
                        and wrote_date = str_to_date('${date}', '%Y-%m-%d')`,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    const diary = new Diary(
                        rows[0]?.diaryNo,
                        rows[0]?.authorId,
                        rows[0]?.content,
                        rows[0]?.emoji,
                        rows[0]?.wroteDate,
                        rows[0]?.image
                    );
                    resolve(diary);
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.deleteByNo = async (no) => {
    const connection = await connect();
    connection.query(
        `delete from diary where diary_no = '${no}'`
    )
    close();
};

exports.update = async (no, content, emoji) => {
    const connection = await connect();
    connection.query(
        `update diary set content = '${content.toString()}', emoji = ${emoji}
        where diary_no = '${no}'`
    )
    close();
};

exports.updateWithImage = async (no, content, emoji, image) => {
    const connection = await connect();
    connection.query(
        `update diary set content = '${content}', emoji = ${emoji}, image = '${image}'
        where diary_no = '${no}'`
    )
    close();
};

exports.exists = async (authorId, no) => {
    try {
        const connection = await connect();
        return new Promise((resolve, reject) => {
            connection.query(
                `select diary_no as diaryNo from diary where author_id = ${authorId} and diary_no = '${no}'`,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    resolve((rows[0]?.diaryNo !== null));
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};
