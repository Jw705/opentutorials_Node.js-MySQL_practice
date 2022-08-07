var template = require('./template.js');
var db = require('./db');
var sanitizeHTML = require('sanitize-html');

exports.home = function (request, response) {
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}`,
    `<a href="/create">create</a>`
  );
  response.send(html);
}

exports.page = function (request, response) {
    var pageID = request.params.pageId
    db.query('SELECT * FROM topic', function (error, topics) {
        if (error) throw error;

        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [pageID], function (error2, topic) {
            if (error2) throw error2;

            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(title, list,
                `<h2>${sanitizeHTML(title)}</h2>
                 <p>작성자 : ${sanitizeHTML(topic[0].name)}</p>
                 ${sanitizeHTML(description)}`,
                ` <a href="/create">create</a>
              <a href="/update/${pageID}">update</a>
              <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${pageID}">
                <input type="submit" value="delete">
              </form>`
            );
            response.send(html);
        });

    });
}

exports.create = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error2, authors) {

            var title = 'Create';
            var list = template.list(topics);
            var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              ${template.authorSelect(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, '<a href="/create">createss</a>');
            response.send(html);
        });
    });
}

exports.create_process = function (request, response) {
  var post = request.body;
  db.query(`INSERT INTO topic (title, description, created, author_id) 
      VALUES(?,?,NOW(), ?)`, [post.title, post.description, post.author],
    function (error, result) {
      if (error) throw error;          
      response.redirect(`/page/${result.insertId}`);
  });
}

exports.update = function (request, response) {
    var pageID = request.params.pageId
    db.query('SELECT * FROM topic', function (error, topics) {
        if (error) throw error;

        db.query(`SELECT * FROM topic WHERE id=?`,[pageID], function (error2, topic) {
          if (error2) throw error2;
          db.query('SELECT * FROM author', function (error2, authors) {
            var list = template.list(topics);
            var html = template.HTML(sanitizeHTML(topic[0].title), list,`
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <p><input type="text" name="title" placeholder="title" value="${sanitizeHTML(topic[0].title)}"></p>
                <p>
                  <textarea name="description" placeholder="description">${sanitizeHTML(topic[0].description)}</textarea>
                </p>
                <p>
                  ${template.authorSelect(authors, topic[0].author_id)}   <!--topic[0].author_id는 기존의 작성자값-->  
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update/page/${topic[0].id}">update</a>`
            );
            response.send(html);
          });          
        });

      });
}

exports.update_process = function (request, response) {
  var post = request.body;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [post.title, post.description, post.author, post.id],
    function (error, result) {
      if (error) throw error;
      response.redirect(`/page/${post.id}`);
    });
}

exports.delete_process = function (request, response) {
  var post = request.body;
  db.query(`DELETE FROM topic WHERE id=?`, [post.id],
    function (error, result) {
      if (error) throw error;
      response.redirect(`/`);
    });
}