var topic = require('./lib_forex/topic');
var author = require('./lib_forex/author');

const express = require('express')
const app = express()
const port = 3000

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

/*
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') { // 메인 페이지
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {  // 페이지 읽기
      topic.page(request, response);
    }
  } else if (pathname === '/create') {          // 페이지 생성
    topic.create(request, response);
  } else if (pathname === '/create_process') {  // 페이지 생성과정
    topic.create_process(request, response);
  } else if (pathname === '/update') {          // 페이지 수정
    topic.update(request, response);
  } else if (pathname === '/update_process') {  // 페이지 수정과정
    topic.update_process(request, response);
  } else if (pathname === '/delete_process') {  // 페이지 삭제과정
    topic.delete_process(request, response);
  } 
    else if (pathname === '/author') {                  // author 확인 페이지
    author.home(request, response);
  } else if (pathname === '/author/create_process') {   // author 추가과정
    author.create_process(request, response);
  } else if (pathname === '/author/update') {   // author 추가과정
    author.update(request, response);
  } else if (pathname === '/author/update_process') {  // 페이지 수정과정
    author.update_process(request, response);
  } else if (pathname === '/author/delete_process') {  // 페이지 삭제과정
    author.delete_process(request, response);
  }

  else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
*/
