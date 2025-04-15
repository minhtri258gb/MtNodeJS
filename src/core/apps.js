var mt = null;
var apps = {

	register: function(_mt) {
		mt = _mt;

		let listApp = [
			"test",
			"piano",
			"music",
			"engine",
			"image",
			"midi",
			"calendar",
			"QR",
			"OCR",
			"request",
			"contact",
			"api",
		];

		let register = (name) => {

			mt.core.app.get("/"+name, (req, res) => {

				if (mt.app[name] == null) {
					mt.app[name] = require("../"+name+"/API.js");
					mt.app[name].init(mt);
				}

				res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+name+"/"+"index.html"));
			});
		}

		for (let i in listApp)
			register(listApp[i]);

		require('../3D/engine.js').register(mt);
		// require('../manager/manager.js').register(mt);
		// require('../localNetwork/API.js').register(mt);

		// Init App
		this.init();

		// Common API
		mt.app['common'] = require("../common/API.js");
		mt.app['common'].init(mt);

	},

	init: function() {

		// API
		mt.core.app.post("/test", this.api_test);
		mt.core.app.post("/init", this.api_init);

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

module.exports = apps;
