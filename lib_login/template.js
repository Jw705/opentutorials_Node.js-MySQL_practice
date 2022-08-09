module.exports = {
  HTML: function (title, list, body, control, authStatusUI = '로그인후 사용 가능합니다') {
    return `
    <!doctype html>
    <html>
    <head>    
      <title>Login TEST - ${title}</title>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css?family=Questrial&display=swap');
        @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: skyblue;
        }

        .background {
            background-color: white;
            height: auto;
            width: 90%;
            max-width: 450px;
            padding: 10px;
            margin: 0 auto;
            border-radius: 5px;
            box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="background">
        ${authStatusUI}<hr>
        ${list}
        ${control}
        ${body}
      </div>
    </body>
    </html>
    `;
  }
}
