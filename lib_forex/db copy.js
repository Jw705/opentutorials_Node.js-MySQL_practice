var mysql = require('mysql2');  // mysql 모듈을 불러온다.

// createConnection 메소드의 인자로 전달되는 객체에 자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
var connection = mysql.createConnection({
  host     : 'localhost',   // host : DB서버의 위치 (ex : localhost) 
  user     : 'me',          // mysql 계정의 user 이름 (ex. root)
  password : 'secret',      // user의 비밀번호
  database : 'my_db'        // 사용할 데이터베이스 이름
});

connection.connect();   // connection 객체의 connect 이라는 메소드 호출 = mysql 연결 시도

// 사용할 SQL문과 콜백함수를 인자로 사용
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();   // mysql 연결 해제



//Create
db.query(`INSERT INTO topic (title, description) VALUES(?,?)`, [post.title, post.description], function (error, result) {
    /* code */
});

//Read
db.query('SELECT * FROM topic', function (error, topics) {
    /* code */
});

//Update
db.query(`UPDATE topic SET title=?, description=?`, [post.title, post.description], function (error, result) {
    /* code */
});

//Delete
db.query(`DELETE FROM topic WHERE id=?`, [post.id], function (error, result) {
    /* code */
});