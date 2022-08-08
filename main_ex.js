var topic = require('./lib_forex/topic');
var author = require('./lib_forex/author');
var authRouter = require('./routes/auth');
var bodyParser = require('body-parser');
const express = require('express')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',         // 버전관리 소스코드에 포함해서는 안됨!
  resave: false,                  // 세션 데이터가 바뀌기 전까지는 세션 저장소에 값을 저장하지 않는다.
  saveUninitialized: true,        // 세션이 필요하기 전까지는 세션을 구동시키지 않는다.
  store:new FileStore(),          // 파일에 세션 저장
}))



// 메인페이지
app.get('/', (req, res) => {
  topic.home(req, res);
})


// 인증 라우터
app.use('/auth', authRouter);



// 글 열람  R
app.get('/page/:pageId', (req, res) => {
  topic.page(req, res);
})
// 글 생성  C
app.get('/create', (req, res) => {
  topic.create(req, res);
})
app.post('/create_process', (req, res) => {
  topic.create_process(req, res);
})
// 글 수정  U 
app.get('/update/:pageId', (req, res) => {
  topic.update(req, res);
})
app.post('/update_process', (req, res) => {
  topic.update_process(req, res);
})
// 글 삭제 D
app.post('/delete_process', (req, res) => {
  topic.delete_process(req, res);
})

// 저자 관련 기능
app.get('/author', (req, res) => {
  author.home(req, res);
})
app.post('/author/create_process', (req, res) => {
  author.create_process(req, res);
})
app.get('/author/update/:pageId', (req, res) => {
  author.update(req, res);
})
app.post('/author/update_process', (req, res) => {
  author.update_process(req, res);
})
app.post('/author/delete_process', (req, res) => {
  author.delete_process(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
