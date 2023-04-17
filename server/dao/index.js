const mysql = require('mysql');

exports.connect = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host:           'localhost',
            user:           'oneulhalu',
            password:       '12345678',
            database:       'oneul_halu_db'
        });

        connection.connect((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(connection);
            }
        });
    });
};

exports.close = async () => {
    const connection = await this.connect();
    connection.end();
}

exports.connectionTest = async () => {
    const connection = await this.connect();
    connection.query("select * from member");
    this.close();
};
