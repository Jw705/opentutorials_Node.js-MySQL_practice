var template = require('./template.js');
var db = require('./db');
var url = require('url');
var qs = require('querystring');
var authCheck = require('./authCheck');

exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var html = template.HTML(title, ``, ``,
            `<hr>
            <h2>메인 페이지에 오신 것을 환영합니다</h2>
            <p>이 페이지에 도착하셨다면 당신은 로그인에 성공한 것입니다</p>`,            
            authCheck.statusUI(request, response)
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