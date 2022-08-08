var template = require('./template.js');
var db = require('./db');
var qs = require('querystring');
var sanitizeHTML = require('sanitize-html');

var authData = {
  email: 'egoing777@gmail.com',
  password: '111111',
  nickname: 'egoing'
}

exports.login = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    var title = 'WEB - login';
    var list = template.list(topics);
    var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
    response.send(html);
  });
}

exports.login_process = function (request, response) {
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if(email === authData.email && password === authData.password){
    request.session.is_logged = true;
    request.session.nickname=authData.email;
    console.log(request.session);
    response.redirect(`/`);
  } else {
    response.send('Who?');
  }
} 

exports.logout = function (request, response) {
  //request.session.destroy(function(err){
  //  response.redirect('/');
  //});
}