const http = require('http');
const app = require('./app');
const port = 7899;

const server = http.createServer(app);

server.listen(port);