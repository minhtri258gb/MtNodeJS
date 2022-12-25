var mt = null;
var piano = {

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/piano", piano.view);
	},

	init: function(_mt) {
		mt = _mt;

		// API nothing

	}

};

module.exports = piano;
