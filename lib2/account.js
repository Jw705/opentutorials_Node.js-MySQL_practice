var template = require('./template.js');
var db = require('./db');
var url = require('url');
var qs = require('querystring');

exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        // console.log(topics);
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        //var list = template.list(topics);
        var html = template.HTML(title, /*list*/"",
            ``,
            ``
        );
        response.writeHead(200);
        response.end(html);
    });
}

exports.login = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    db.query('SELECT * FROM author', function (error2, authors) {
      var title = 'Create';
      var html = template.HTML(title, "", `
      <form action="/login_process" method="post">
        <p>ID : <input type="text" name="id" placeholder="id"></p>        
        <p>PW : <input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
      </form>
      `, '<a href="/create">createss</a>');
      response.writeHead(200);
      response.end(html);
    });
  });
}

exports.login_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);

    //var username = post.username;
    //var password = post.password;

    //var username = request.body.username;
    //var password = request.body.password;

    /*
    if (username && password) {
      connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [post.username, post.password], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/');
          response.end();
        } else {
          response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');
        }
      });
    } else {
      response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');
      response.end();
    }
    */

    // 세션을 알려면 express를 알아야하네 무친
  });
}