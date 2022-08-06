var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wndhks5219!',
    database: 'opentutorials'
});
db.connect();

module.exports = db;