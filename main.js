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
