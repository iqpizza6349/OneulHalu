const { connect, close } = require(".");

exports.save = (diaryNo, authorId, content, emoji, wroteDate) => {
    connect().query(
        `insert into diary (diary_no, author_id, content, emoji, wrote_date)
        values (${diaryNo}, ${authorId}, ${content}, ${emoji}, ${wroteDate})`
    );
    close();
};

exports.findAllByAuthor = (authorId, start, end) => {
    connect().query(
        `select diary_no as diaryNo, author_id as authorId, content,
                emoji, wrote_date as wroteDate
        from diary
        where author_id = ${authorId}
            and wrote_date >= str_to_date(${start}, '%Y-%m-%d')
            and wrote_date <= str_to_date(${end}, '%Y-%m-%d')`
    );
    close();
};

exports.findByNo = (no) => {
    connect().query(
        `select diary_no as diaryNo, author_id as authorId, content,
                emoji, wrote_date as wroteDate
        from diary
        where diary_no = ${no}`
    );
    close();
};

exports.findDiary = (authorId, date) => {
    connect().query(
        `select diary_no as diaryNo, author_id as authorId, content,
                emoji, wrote_date as wroteDate
        from diary
        where author_id = ${authorId}
                and wrote_date = str_to_date(${date}, '%Y-%m-%d')`
    );
    close();
};

exports.deleteByNo = (no) => {
    connect().query(
        `delete from diary where diary_no = ${no}`
    )
    close();
};

exports.update = (no, content, emoji) => {
    connect().query(
        `update diary set content = ${content}, emoji = ${emoji}
        where diary_no = ${no}`
    )
    close();
};

exports.exists = (authorId, no) => {
    connect().query(
        `select 1 from diary where author_id = ${authorId} and diary_no = ${no}`
    );
    close();
};
