var mt = null;
var common = {

	init: function(_mt) {
		mt = _mt;

		// Library
		mt.lib.register('os', 'os');
		
		// API
		mt.core.app.post("/authorize", this.api_authorize);
		mt.core.app.get("/common/getIPLocal", this.api_getIPLocal);
		
	},

	api_authorize: function(req, res) {
		res.end(mt.util.authorize(req) ? "true" : "false");
	},

	api_getIPLocal: function(req, res) {
		let nets = mt.lib.os.networkInterfaces();
		let wifi = nets['Wi-Fi'];
		if (wifi) {
			for (let net of wifi) {
				const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
				if (net.family === familyV4Value && !net.internal) {
					res.status(200).json({IP: net.address});
					return;
				}
			}
		}
		res.status(300).send("IP not found");
	}
	
};

module.exports = common;
