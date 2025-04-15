import path from 'path';

var mtSoundHandler = {

	register: function() {
		mt.core.app.get('/soundHandler', function(req, res) {
			if (mt.app.imageHandler == undefined) {
				mt.app.imageHandler = app;
				app.init();
			}
			res.sendFile(path.join(__dirname, '../../client', '/soundHandler/gui.html'));
		});
	},

	example: function() {
		const MP3Cutter = require('mp3-cutter');

		MP3Cutter.cut({
			src: 'source.mp3',
			target: 'target.mp3',
			start: 25,
			end: 70 
		});
	}
};
export default mtSoundHandler;