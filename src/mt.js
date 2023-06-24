var mt = {

	config: require('./core/config'),

	lib: {
		register: function(name, lib) {
			if (this[name] == undefined)
				this[name] = require(lib);
		}
	},

	app: require('./core/apps'),
	core: {
		register: function(name, core) {
			if (this[name] == undefined) {
				this[name] = require(core);
				this[name].init(mt);
			}
		}
	},

	util: {
		authorize: require('./utils/authorize')
	},

	init: function() {

		// Lib
		this.lib.register('express', 'express');
		this.lib.register('path', 'path');
		this.lib.register('http', 'http');
		this.lib.register('socket', 'socket.io');
		this.lib.register('fs', 'fs');
		this.lib.register('bodyParser', 'body-parser');
		this.lib.register('cors', 'cors');

		// Hidden console
		if (!mt.config.debug) {
			this.util.hiddenConsole = require('./core/util/hiddenConsole');
			this.util.hiddenConsole(true);
		}

		// Core
		this.core.app = this.lib.express();

		// App
		this.app.register(this);

		// Register default
		this.core.app.use(this.lib.cors());
		this.core.app.use("/", this.lib.express.static(this.config.client_path)); // Static
		this.core.app.get("/", (req, res) => { // Home
			res.sendFile(this.lib.path.join(__dirname, '../', this.config.client_path, '/common/home.html'));
		});
		this.core.app.use(mt.lib.bodyParser.json()); // to support JSON-encoded bodies
		this.core.app.use(mt.lib.bodyParser.urlencoded({ // to support URL-encoded bodies
			extended: true
		}));

		// Server
		this.core.server = this.lib.http.createServer(this.core.app);
		this.core.server.listen(80);
		
		// Socket
		this.core.io = this.lib.socket(this.core.server);
		this.core.io.on('connection', (socket) => {
			socket.on('send', function (data) {
				this.io.sockets.emit('send', data);
			});
		});

		// Tray icon
		if (!mt.config.debug)
			this.core.register('tray', './core/tray');

		// Notification
		console.log("Server online ...");
		
	},
	
};

module.exports = mt;
