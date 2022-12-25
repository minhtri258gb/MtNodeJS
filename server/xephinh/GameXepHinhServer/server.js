
// Routes
const routes = require('./src/routing.js');
routes.init();

// Server
const server = require('http').createServer(routes.app);
server.listen(1212);

// Socket
const socket = require('./src/socket.js');
socket.bind(server);
