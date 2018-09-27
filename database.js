//bring in mysql
const mysql = require("mysql");
//get the config file
const config = require("./config/config");

//create a mysql connection
const conn = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DBNAME
});

conn.connect(err => {
    if (err) {
        console.log(`Connection error ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${conn.threadId}`);
});

module.exports = conn;