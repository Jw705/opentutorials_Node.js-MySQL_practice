module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Login TEST - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Login TEST</a></h1>
      <a href="/login">로그인</a>
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
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
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
      tag = tag + `<option value=${authors[i].id}${selected}>${authors[i].name}</options>`
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
          <td>${authors[i].name}</td>
          <td>${authors[i].profile}</td>
          <td><a href="/author/update?id=${authors[i].id}">update</a></td>
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
