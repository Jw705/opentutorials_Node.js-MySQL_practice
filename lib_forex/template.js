var sanitizeHTML = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control, authStatusUI='<a href="/auth/login">login</a>'){
    return `
    <!doctype html>
    <html>
    <head>
      ${authStatusUI}
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/page/${topics[i].id}">${sanitizeHTML(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect:function(authors, author_id){
    var tag = '';
    for (var i = 0; i < authors.length; i++) {
      var selected='';
      if(author_id === authors[i].id) {
        selected = ' selected'; 
      }
      tag = tag + `<option value=${authors[i].id}${selected}>${sanitizeHTML(authors[i].name)}</options>`
    }
    return `
      <select name="author">
        ${tag}
      </select>
    `
  },authorList:function(authors){
    var list = '<table>';
    for (var i = 0; i < authors.length; i++) {
      list = list + `
        <tr>
          <td>${sanitizeHTML(authors[i].name)}</td>
          <td>${sanitizeHTML(authors[i].profile)}</td>
          <td><a href="/author/update/${authors[i].id}">update</a></td>
          <td>
            <form action="/author/delete_process" method="post">
              <input type="hidden" name="id" value="${authors[i].id}">
              <input type="submit" value="delete">
            </form>
          </td>
        </tr>`
    }
    list = list+'</table>';
    return list;
  }
}
