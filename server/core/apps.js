var apps = {

	register: function(mt) {

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
			"request"
		];

		let register = (name) => {
			mt.core.app.get("/"+name, (req, res) => {
				if (mt.app[name] == undefined) {
					mt.app[name] = require("../"+name+"/API.js");
					mt.app[name].init(mt);
				}
				res.sendFile(mt.lib.path.join(__dirname, "../../client", name, "gui.html"));
			});
		}

		for (let i in listApp)
			register(listApp[i]);

		require('../3D/engine.js').register(mt);
		require('../manager/manager.js').register(mt);
		require('../localNetwork/API.js').register(mt);

		// Common API
		mt.app['common'] = require("../common/API.js");
		mt.app['common'].init(mt);

	},

	test: function(req) {
		let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
		if (ip == '::1')
			return true;
		return false;
	},

};

module.exports = apps;
