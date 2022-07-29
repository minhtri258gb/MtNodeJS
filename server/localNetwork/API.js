var mt = null;
var app = {

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/localNetwork", function(req, res) {
			if (mt.app.localNetwork == undefined) {
				mt.app.localNetwork = app;
				app.init();
			}
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/localNetwork/gui.html'));
		});
	},

	init: function() {

		// Library
		mt.lib.register('localDevices', 'local-devices');
		
		// APIs
		mt.core.app.get("/localNetwork/scan", this.api_scan);

		console.log('app init')

	},

	// APIs
	api_scan: function(req, res) {

		mt.lib.localDevices('192.168.1.77').then(devices => {
			res.send(devices);
		})

		


		// mt.lib.localDevices().then(devices => {
		// 	// devices
		// 	/*
		// 	[
		// 	  { name: '?', ip: '192.168.0.10', mac: '...' },
		// 	  { name: '...', ip: '192.168.0.17', mac: '...' },
		// 	  { name: '...', ip: '192.168.0.21', mac: '...' },
		// 	  { name: '...', ip: '192.168.0.22', mac: '...' }
		// 	]
		// 	*/

		// 	res.send(devices);
		// })
	}

};

module.exports = app;
