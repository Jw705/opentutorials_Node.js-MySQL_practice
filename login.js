
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

var account = require('./lib_login/account');
var authRouter = require('./lib_login/auth');
var authCheck = require('./lib_login/authCheck.js');

var template = require('./lib_login/template.js');

const app = express()
const port = 3000

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',         // 버전관리 소스코드에 포함해서는 안됨!
  resave: false,                  // 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않는다.
  saveUninitialized: true,        // 세션이 필요하기 전까지는 세션을 구동시키지 않는다.
  store:new FileStore(),          // 파일에 세션 저장
}))

app.get('/', (request, response) => {
  if (!authCheck.isOwner(request, response)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    response.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    response.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  //account.home(req, res);
  var title = 'Welcome';
  var html = template.HTML(title, ``, ``,
    `<hr>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

