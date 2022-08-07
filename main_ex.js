var topic = require('./lib_forex/topic');
var author = require('./lib_forex/author');
var db = require('./lib_forex/db');

const express = require('express');
const app = express();
const port = 3000;

const helmet = require("helmet");
app.use(helmet());

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(request,response,next){
  db.query('SELECT * FROM topic', function (error, topics) {
    request.list=topics;    
    next();
  });
})

// 메인페이지
app.get('/', (req, res) => {
  topic.home(req, res);
})
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


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
