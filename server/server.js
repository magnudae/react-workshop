var jsonServer = require('json-server');

var server = jsonServer.create(); // Returns an Express server
var router = jsonServer.router('server/db.json'); // Returns an Express router

server.use(jsonServer.defaults); // logger, static and cors middlewares
server.use(router); // Mount router on '/'

server.listen(3000);

console.log("Running json-server on http://localhost:3000/");
