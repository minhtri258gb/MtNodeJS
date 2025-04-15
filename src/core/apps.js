import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import listEndpoints from 'express-list-endpoints';

import mtCommon from '../common/API.js';

var mtApps = {

	register: async function() {

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const rootPath = path.dirname(__dirname);

		// Khai báo hàm đăng ký
		let register = async (name) => {

			// mt.core.app.get("/"+name+'/init', (req, res) => {

				const apiPath = path.join(rootPath, name, 'API.js');


				// Kiểm tra file API.js tồn tại
				try {
					await fs.access(apiPath);
				}
				catch (e) {
					return; // Nếu ko có API thì ko đăng ký
				}

				// Load động module với import()
				const addon = await import(`file://${apiPath}`);

				// Gọi register() từ module (hoặc export default nếu cần)
				if (addon.register) {
					mt.app[name] = addon;
					addon.register();
				}
				else if (addon.default?.register) {
					mt.app[name] = addon;
					addon.default.register();
				}
				else
					console.warn(`[ERROR] Addon tại ${apiPath} không có hàm register`);

				// res.json(true);
				//res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+name+"/"+"index.html"));
			// });
		}

		const folders = await fs.readdir(rootPath, { withFileTypes: true });
		for (const folder of folders) {

			// Chỉ xử lý nếu là thư mục
			if (folder.isDirectory() == false)
				continue;

			register(folder.name);
		}

		// require('../3D/engine.js').register(mt);
		// require('../manager/manager.js').register(mt);
		// require('../localNetwork/API.js').register(mt);

		// Init App
		this.init();

		// Common API
		mt.app['common'] = mtCommon;
		mtCommon.register();

	},

	init: function() {

		// API
		mt.core.app.post('/test', this.api_test);
		mt.core.app.post('/init', this.api_init);

		// List API
		mt.core.app.get('/endpoints', (req, res) => {
			res.json(listEndpoints(mt.core.app));
		});

		// console.log('app Init')
	},

	// API
	api_init: function(req, res) {
		try {

			// Process body
			let name = req.body?.app || '';

			// Validate
			if (name.length == 0)
				throw { error: true, msg: 'Không tìm thấy tên App' };

			// Register app
			if (mt.app[name] == undefined) {
				mt.app[name] = require(`../${name}.js`);
				mt.app[name].init(mt);

				// Response
				res.status(200).json({ err: false, msg: "App init" });
			}
			else {

				// Response
				res.status(201).json({ err: false, msg: "App already" });
			}
		}
		catch (e) {
			res.status(300).json({ err: true, dtl: e });
		}
	},

	api_test: function(req, res) {
		res.status(200).send("Test done");
	},

};
export default mtApps;