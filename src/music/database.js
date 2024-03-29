var mt = null;
var database = {

	struct: {
		music: [],
		music_tag: [],
		music_tag_map: []
	},

	init: function(_mt) {
		mt = _mt;
		mt.lib.register('sqlite', 'sqlite-sync');
	},

	connect: function() {
		mt.lib.sqlite.connect("./src/music/db.sqlite");
	},

	disconnect: function() {
		mt.lib.sqlite.close();
	},

	insertMusic: function(data) {
		if (data.id != undefined)
			delete data.id;
		// Check if name is null, set file name same
		if (!data.name)
			data.name = data.filename;
		mt.lib.sqlite.insert("music", data, function(newID) {});
	},
	 
	updateMusic: function(data) {
		let id = data.id;
		delete data.id;
		var rows_modified = mt.lib.sqlite.update("music", data, {id:id});
	},

	selectAll: function() {
		return mt.lib.sqlite.run("SELECT * FROM music WHERE miss = 0 ORDER BY artists, name");
	},

	// Advanced
	getAllFilename: function() {
		return mt.lib.sqlite.run("SELECT filename FROM music WHERE miss = 0");
	},

	getById: function(id) {
		let datas = mt.lib.sqlite.run("SELECT * FROM music WHERE id = " + id);
		return datas[0] || null;
	},

	miss: function(filename) {
		let rows_modified = 0;
		let datas = this.getMusicByFilename(filename);
		if (datas.length > 0) {
			let data = datas[0];
			data.miss = 1;
			let id = data.id;
			delete data.id;
			rows_modified = mt.lib.sqlite.update("music", data, {id:id});
		}
		return rows_modified;
	},

	getMusicByFilename: function(filename) {
		return mt.lib.sqlite.run("SELECT * FROM music WHERE filename = \""+filename+"\"");
	},

	music: {
		insertTrack: function(id) {
			database.connect();

			// Lấy dữ liệu bài
			let res = mt.lib.sqlite.run("SELECT * FROM music WHERE id = " + id);
			if (res.length == 0) {
				database.disconnect();
				throw "Không tìm thấy ID bài hát";
			}
			let music = res[0];

			// Tìm xem có track chưa
			let trackname = music.name + " (track)";
			res = mt.lib.sqlite.run("SELECT * FROM music WHERE name = \""+trackname+"\"");
			if (res.length > 0) {
				database.disconnect();
				throw "Bài hát đã có track";
			}

			// Intert
			mt.lib.sqlite.insert("music", {
				name: trackname,
				decibel: music.decibel,
				tag: music.tag
			}, function(newID) {});

			// Done
			database.disconnect();
		}
	}

};

module.exports = database;
