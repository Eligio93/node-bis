import { URL } from 'url';
import http from 'http';
import fs from 'fs'


http.createServer(function (req, res) {
  let baseUrl = new URL(req.url, 'http://localhost:8080');
  if (baseUrl.pathname == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    })
  } else {
    let pagePath = '.' + baseUrl.pathname + '.html'
    fs.readFile(pagePath, function (err, data) {
      if (err) {
        fs.readFile('./404.html', function (err, data) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      }
    })
  }
}).listen(8080);