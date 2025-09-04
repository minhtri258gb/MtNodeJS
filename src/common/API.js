import os from 'os';

var mtCommon = {

	register: function() {

		// API
		mt.server.register('POST', '/authorize', false, this.api_authorize);
		mt.server.register('GET', '/checkToken', true, this.api_checkToken);
		mt.server.register('GET', '/common/getIPLocal', false, this.api_getIPLocal);
		mt.server.register('GET', '/common/getConfig', false, this.api_getConfig);

	},

	api_authorize: function(req, res) {
		let body = req.body || {};
		let password = body.password || '';
		let token = mt.authen.accessToken(password);
		res.json({ result: token.length > 0, token });
	},
	api_checkToken: function(req, res) {
		res.json({ result: true });
	},
	api_getIPLocal: function(req, res) {
		try {
			let nets = os.networkInterfaces();
			for (let name of Object.keys(nets)) {
				let networkName = nets[name];
				for (let net of networkName) {
					const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
					if (net.family === familyV4Value && !net.internal) {
						res.send(net.address);
						return;
					}
				}
			}
			res.status(400).send("IP not found");
		}
		catch (e) {
			res.status(500).send(`[mt.common.api_getIPLocal] Exception: ${ex}`);
		}
	},
	api_getConfig: function(req, res) {
		try {

			// Input
			let params = req.query || {};
			let key = params.key || '';

			let result = null;
			switch (key) {
				case 'PATH_CLIENT': result = process.env.PATH_CLIENT; break;
				case 'PATH_MUSIC': result = process.env.PATH_MUSIC; break;
				case 'PATH_WALLPAPER': result = process.env.PATH_WALLPAPER; break;
			}
			if (result != null && result.length > 0)
				res.send(result);
			else
				res.status(400).send(`Không tìm thấy Key ${key}`);
		}
		catch (ex) {
			res.status(500).send(`[mt.common.api_getConfig] Exception: ${ex}`);
		}
	}

};
export default mtCommon;