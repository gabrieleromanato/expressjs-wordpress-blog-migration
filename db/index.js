'use strict';

const mysql = require('mysql');

const params = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database'
};

const connection = mysql.createConnection(params);

connection.connect();

const query = (queryString, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, values, (err, results, fields) => {
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    query
};