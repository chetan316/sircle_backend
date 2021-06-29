const mysql2 = require('mysql2')
const config = require('./index');
const HttpException = require('../utils/httpexception.utils');

// const db = mysql2.createPool({
//     host: config.db.DB_HOST,
//     user: config.db.DB_USER,
//     password: config.db.DB_PASS,
//     database: config.db.DB_DATABASE
// })

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'ER_ACCESS_DENIED_ERROR') {
                    console.error(err)
                }
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                    // throw new HttpException(500, err)
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                    // throw new HttpException(500, err)
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                    // throw new HttpException(500, err)
                }
                throw new HttpException(500, err)
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;