var http = require('http');
var url = require('url');
var account = require('./lib2/account');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') { // 메인 페이지
    if (queryData.id === undefined) {
      account.home(request, response);
    } else {  // 페이지 읽기
      account.page(request, response);
    }
  } else if (pathname === '/login') {          // 페이지 생성
    account.login(request, response);
  } else if (pathname === '/login_process') {  // 페이지 생성과정
    account.login_process(request, response);
  }

  else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
