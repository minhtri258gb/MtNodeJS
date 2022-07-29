var mt = null;
var apps = {

	register: function(mt) {
		
		require('../music/music.js').register(mt);
		require('../midi/piano.js').register(mt);
		require('../3D/engine.js').register(mt);
		require('../manager/manager.js').register(mt);
		require('../imageHandler/API.js').register(mt);
		require('../localNetwork/API.js').register(mt);
		require('../engine/API.js').register(mt);

		// Common API
		mt.core.app.post("/authorize", function(req, res) {
			res.end(mt.util.authorize(req) ? "true" : "false");
		});

		// Test
		mt.core.app.get("/test", (req, res) => {
			apps.test(req);
			res.end();
		});
		// this.core.app.get("/test2", (req, res) => {
		// 	res.send(mt.test2());
		// });
		
	},

	test: function(req) {
		let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
		if (ip == '::1')
			return true;
		return false;
	},

};

module.exports = apps;
