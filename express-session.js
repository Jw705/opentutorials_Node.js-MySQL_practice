var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()

app.use(session({
    secret: 'keyboard cat',         // 버전관리 소스코드에 포함해서는 안됨!
    resave: false,                  // 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않는다.
    saveUninitialized: true,        // 세션이 필요하기 전까지는 세션을 구동시키지 않는다.
    store: new FileStore()          // 파일에 세션 저장
}))

app.get('/', function (req, res, next) {
    //res.send('you viewed this page ' + req.session.views['/bar'] + ' times');
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    }
    else {
        req.session.num++;
    }
    res.send(`Views : ${req.session.num}`)
})

app.listen(3000);