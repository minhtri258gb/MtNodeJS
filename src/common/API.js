import os from 'os';

var mtCommon = {

	register: function() {

		// API
		mt.server.register('POST', '/authorize', false, this.api_authorize);
		mt.server.register('GET', '/common/getIPLocal', false, this.api_getIPLocal);

	},

	api_authorize: function(req, res) {
		let body = req.body || {};
		let password = body.password || '';
		let token = mt.authen.accessToken(password);
		res.json({ result: token.length > 0, token });
	},
	api_getIPLocal: function(req, res) {
		try {
			let nets = os.networkInterfaces();
			for (let name of Object.keys(nets)) {
				if (name.includes('Wi-Fi')) {
					let wifi = nets[name];
					for (let net of wifi) {
						const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
						if (net.family === familyV4Value && !net.internal) {
							res.status(200).json(net.address);
							return;
						}
					}
				}
			}
			res.status(300).send("IP not found");
		}
		catch (e) {
			res.status(300).send("[ERROR] "+e);
		}
	},
	api_getConfig: function(req, res) {
		try {

			// Input
			let params = req.query || {};
			let name = params.name || '';

			let result = null;
			switch (name) {
				case 'clientPath':
					result = process.env.CLIENT_PATH;
					break;
			}
			if (result != null)
				res.json(mt.config);
			else
				res.status(300).send("Not found");
		}
		catch (e) {
			res.status(300).send("[ERROR] "+e);
		}
	}

};
export default mtCommon;