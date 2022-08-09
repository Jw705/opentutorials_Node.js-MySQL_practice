var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'ndrm_bot',
    password: 'nd205!',
    database: 'testndrm'
});
db.connect();
/**/
module.exports = db;