var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'TEST1234',
    database: 'opentutorials'
});
db.connect();

module.exports = db;