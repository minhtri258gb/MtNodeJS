import os from 'os';

var mtCommon = {

	register: function() {

		// API
		mt.core.app.post('/authorize', this.api_authorize);
		mt.core.app.get('/common/getIPLocal', this.api_getIPLocal);

	},

	api_authorize: function(req, res) {
		res.end(mt.util.authorize(req) ? "true" : "false");
	},

	api_getIPLocal: function(req, res) {
		let nets = os.networkInterfaces();
		let wifi = nets['Wi-Fi'];
		if (wifi) {
			for (let net of wifi) {
				const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
				if (net.family === familyV4Value && !net.internal) {
					res.status(200).json(net.address);
					return;
				}
			}
		}
		res.status(300).send("IP not found");
	}

};
export default mtCommon;