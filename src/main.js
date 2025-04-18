import mtConfig from './core/config.js';
import mtServer from './core/server.js';
import mtApps from './core/apps.js';
import mtTray from './core/tray.js';
import MtAuthorize from './utils/authorize.js';
import hiddenConsole from './core/util/hiddenConsole.js';

var mtMain = {

	config: mtConfig,

	app: mtApps,
	server: mtServer,
	tray: mtTray,

	util: {
		authorize: MtAuthorize,
		hiddenConsole: hiddenConsole,
	},

	init: function() {
		try {

			// Gán biến toàn cục
			globalThis.mt = this;

			// Xử lý args
			for (let arg of process.argv) {
				if (!arg.startsWith('-'))
					continue;
				if (arg == '-debug')
					this.config.debug = true;
			}

			// Ẩn console
			if (!this.config.debug)
				this.util.hiddenConsole(true);

			// Server Setup
			this.server.setup();

			// App Register
			this.app.register();

			// Server Start
			this.server.start();

			// Socket
			// this.core.io = socket.socket(this.core.server);
			// this.core.io.on('connection', (socket) => {
			// 	socket.on('send', function (data) {
			// 		this.io.sockets.emit('send', data);
			// 	});
			// });

			// Tray icon
			if (!this.config.debug)
				this.tray.init();
		}
		catch (e) {
			console.log(e);
		}
	},

};

// Run App
mtMain.init();
