const { connect, close } = require(".");
const Member = require('../models/Member');

exports.save = async (email, name, password) => {
    const connection = await connect();
    connection.query(
        `insert into member(member_id, email, name, password)
        values(DEFAULT, '${email}', '${name}', '${password}')`
    );
    close();
};

exports.findByEmail = async (email) => {
    try {
        const connection = await connect();
        return new Promise((resolve, reject) => {
            connection.query(
                `select member_id as id, email, name, password from member where email = '${email}'`,
                function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    const member = new Member(
                        rows[0]?.id,
                        rows[0]?.email,
                        rows[0]?.name,
                        rows[0]?.password
                    );
                    resolve(member);
                }
            );
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};


exports.findById = (id) => {
    connect().query(
        `select member_id as id, email, name, password
        from member where member_id = ${id}`
    );
    close();
};
