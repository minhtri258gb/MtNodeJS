var mt = null;
var app = {

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/engine", function(req, res) {
			if (mt.app.engine == undefined) {
				mt.app.engine = app;
				app.init();
			}
			// res.sendFile(mt.lib.path.join(__dirname, '../../client', '/engine/gui.html'));
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/engine.html'));
		});
	},

	init: function() {
		
	}
}

module.exports = app;
