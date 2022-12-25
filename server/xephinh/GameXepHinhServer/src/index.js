
// Routes
const routes = require('./routing.js');
routes.init();

// Server
const server = require('http').createServer(routes.app);
server.listen(1212);

// Socket
const socket = require('./socket.js');
socket.bind(server);
