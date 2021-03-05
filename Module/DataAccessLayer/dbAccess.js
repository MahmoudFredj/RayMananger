const mysql = require('mysql');
class DbAccess {
    constructor() {
    }

    offlineOperation = (query) => {
        const connection = DbAccess.connection;
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) { reject(err); connection.end(); }
            });
            connection.query(query, (err, result, fields) => {
                if (err) { reject(err); connection.end(); }
                resolve(result);
                connection.end();
            });
        }
        );
    }

    onlineOperation = (query, values) => {
        const connection = DbAccess.connection;
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) { reject(err); connection.end(); }
            });
            connection.query(query, values, (err, result, fields) => {
                if (err) { reject(err); connection.end(); }
                resolve(result);
                connection.end();
            });
        }
        );
    }

    static connect = ({ host, user, password, database }) => {
        console.log(`Database connected on ${host} ...`)
        DbAccess.connection = mysql.createConnection({ host, user, password, database });
    }
}

module.exports = DbAccess;