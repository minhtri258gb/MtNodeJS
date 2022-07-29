var mt = null;
var piano = {

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/piano", piano.view);
	},

	view: function(req, res) {
		if (mt.app.piano == undefined) {
			mt.app.piano = piano;
			piano.init();
		}
		res.sendFile(mt.lib.path.join(__dirname, '../../client', 'midi/html/piano.html'));
	},

	init: function() {

		// API nothing

	}

};

module.exports = piano;
