var express = require('express');
var router = express.Router();

var template = require('../lib_forex/template.js');
var db = require('../lib_forex/db');
var qs = require('querystring');

var authData = {
    email: 'egoing777@gmail.com',
    password: '111111',
    nickname: 'egoing'
}

router.get('/login', function (request, response) {
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
});

router.post('/login_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var password = post.pwd;
    if (email === authData.email && password === authData.password) {
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        request.session.save(function () {
            response.redirect(`/`);
        });
    } else {
        response.send('Who?');
    }
});

router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});

module.exports = router; 