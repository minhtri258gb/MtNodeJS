var mt = null;
var admin = {

	register: function(_mt) {
		mt = _mt;
		mt.server.register('GET', "/music/admin", admin.view);
	},

	view: function(req, res) {
		if (mt.app.music.admin == undefined) {
			mt.app.music.admin = admin;
			admin.init();
		}
		res.sendFile(mt.lib.path.join(__dirname, '../../client', '/music/admin.html'));
	},

	init: function() {

		// API
		mt.server.register('POST', "/music/admin/getListMusic", admin.api_getListMusic);
		mt.server.register('POST', "/music/admin/save", admin.api_save);

	},

	// API
	api_getListMusic: function(req, res) {

		// Read data
		let datas = mt.app.music.getListMusic();

		// Read disk
		let files = mt.lib.fs.readdirSync(mt.app.music.config.dirMusic);

		// Merge
		if (datas.length != files.length) {

			// Xoa phan tu trung trong files
			for (let i=0; i<datas.length; i++) {
				let data = datas[i];
				for (let j=0; j<files.length; j++) {
					if (files[j] == (data.name+'.mp3')) {
						files.splice(j, 1);
						break;
					}
				}
			}

			// Them vao data
			for (let i=0; i<files.length; i++)
				datas.push({name:files[i].substring(0, files[i].length - 4)});

			// Sap xep lai
			datas.sort((a, b) => a.name.localeCompare(b.name));

			// Luu db lai
			mt.lib.fs.writeFileSync(mt.app.music.config.fileData, JSON.stringify(datas));
		}

		// Return
		res.end(JSON.stringify(datas));
	},

	api_save: function(req, res) {
		mt.lib.fs.writeFileSync(mt.app.music.config.fileData, JSON.stringify(req.body.data));
		res.status(200).send("Success");
	},

	// Handler
	getListMusic: function() {

	}

}

module.exports = admin;
