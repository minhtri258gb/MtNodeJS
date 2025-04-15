
import express from 'express';
import path from 'path';
import http from 'http';
// import * as socket from 'socket.io';
// import fs from 'fs';
// import bodyParser from 'body-parser';
import cors from 'cors';

import MtConfig from './core/config.js';
import MtApps from './core/apps.js';
import MtAuthorize from './utils/authorize.js';
import hiddenConsole from './core/util/hiddenConsole.js';

var mt = {

	config: MtConfig,

	// lib: {
	// 	register: function(name, lib) {
	// 		if (this[name] == null)
	// 			this[name] = require(lib);
	// 	}
	// },

	app: MtApps,
	core: {
		// register: function(name, core) {
		// 	if (this[name] == null) {
		// 		this[name] = require(core);
		// 		this[name].init(mt);
		// 	}
		// }
	},

	util: {
		authorize: MtAuthorize,
		hiddenConsole: hiddenConsole,
	},

	init: function() {

		// Gán toàn cục
		globalThis.mt = this;

		// Hidden console
		if (!mt.config.debug)
			this.util.hiddenConsole(true);

		// Core
		this.core.app = express();

		// Register default
		this.core.app.use(cors());
		this.core.app.use("/", express.static(this.config.client_path)); // Static
		this.core.app.get("/", (req, res) => { // Home
			res.sendFile(path.join(__dirname, '../', this.config.client_path, '/home/index.html'));
		});
		this.core.app.use(express.json());
		// this.core.app.use(mt.lib.bodyParser.json()); // to support JSON-encoded bodies
		// this.core.app.use(mt.lib.bodyParser.urlencoded({ // to support URL-encoded bodies
		// 	extended: true
		// }));

		// App
		this.app.register();

		// Server
		this.core.server = http.createServer(this.core.app);
		this.core.server.listen(this.config.port);

		// Socket
		// this.core.io = socket.socket(this.core.server);
		// this.core.io.on('connection', (socket) => {
		// 	socket.on('send', function (data) {
		// 		this.io.sockets.emit('send', data);
		// 	});
		// });

		// Tray icon
		if (!mt.config.debug)
			this.core.register('tray', './core/tray');

		// Notification
		console.log(`Server online: http://localhost:${this.config.port}`);

	},

};
export default mt;