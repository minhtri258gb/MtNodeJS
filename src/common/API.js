import os from 'os';
import { exec } from 'child_process';

var mtCommon = {

	register: function() {

		// API
		mt.server.register('POST', '/authorize', false, this.api_authorize);
		mt.server.register('GET', '/checkToken', true, this.api_checkToken);
		mt.server.register('GET', '/common/getIPLocal', false, this.api_getIPLocal);
		mt.server.register('GET', '/common/getConfig', false, this.api_getConfig);
		mt.server.register('POST', '/common/cmd', true, this.api_cmd);

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
				if (name != 'Wi-Fi')
					continue;
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
		catch (ex) {
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
	},
	api_cmd: async function(req, res) {
		try {

			let body = req.body || {};
			let paths = body.paths || [];
			let cmd = body.cmd || '';

			if (cmd.length == 0) {
				res.json({ result: false, message: 'CMD trống!' });
				return;
			}

			// Thêm vào PATH
			let finalPath = process.env.PATH;
			if (paths.length > 0) {
				for (let path of paths)
					finalPath += ';' + path;
			}
			const options = {
				env: { PATH: finalPath }
			};

			let result = await new Promise((resolve, reject) => {
				exec(cmd, options, (error, stdout, stderr) => {
					if (error)
						reject(error);
					else
						resolve({ stdout, stderr });
				});
			});

			res.json(result);
		}
		catch (ex) {
			res.status(500).send(`[mt.common.api_cmd] Exception: ${ex}`);
		}
	},

};
export default mtCommon;