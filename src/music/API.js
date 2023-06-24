
var mt = null;
var music = {

	config: require('./config'),
	database: require('./database'),

	init: function(_mt) {
		mt = _mt;

		// Library
		mt.lib.register('mp3cutter', 'mp3-cutter');

		// Database
		this.database.init(mt);

		// Sub app
		// require('./admin').register(mt);

		// API
		mt.core.app.post("/music/getListMusic", this.api_getListMusic);
		mt.core.app.get("/music/getMusic", this.api_getMusic);
		mt.core.app.post("/music/refresh", this.api_refresh);
		mt.core.app.post("/music/add", this.api_add);
		mt.core.app.post("/music/edit", this.api_edit);
		mt.core.app.delete("/music/remove", this.api_remove);
		mt.core.app.post("/music/cut", this.api_cut);
	},

	getListMusic: function() {
		let rawdata = mt.lib.fs.readFileSync(mt.app.music.config.fileData);
		let str = rawdata.toString();
		if (str.length == 0) str = '[]';
		let data = JSON.parse(str);
		return data;
	},

	api_getListMusic: function(req, res) {

		// Get list from database
		music.database.connect();
		let data = music.database.selectAll();
		music.database.disconnect();

		// Filter
		let dataFillter = [];
		let include = req.body.include;
		let exclude = req.body.exclude;

		for (let i=0; i<data.length; i++) {
			let tags = data[i].tag;
			if (tags == undefined) tags = [];
			
			let check = true;

			// check include
			if (include != undefined) {
				for (let j=0; j<include.length; j++) {
					if (!tags.includes(include[j])) {
						check = false;
						break;
					}
				}
			}

			// check exclude
			if (exclude != undefined) {
				for (let j=0; j<exclude.length; j++) {
					if (tags.includes(exclude[j])) {
						check = false;
						break;
					}
				}
			}

			if (check)
				dataFillter.push(data[i]);
		}

		// Return
		res.json(dataFillter);
	},
	api_getMusic: function(req, res) {
		let file = null;
		try {
			file = mt.lib.fs.readFileSync(mt.lib.path.join(music.config.dirMusic + req.query.filename + '.mp3'), 'binary');
		} catch (e) {
			if (e.code == 'ENOENT') {
				music.database.connect();
				music.database.miss(req.query.filename);
				music.database.disconnect();
				res.status(404).send("Music not found");
				return;
			}
		}
		res.setHeader('accept-ranges', 'bytes');
		res.setHeader('Content-Length', file.length);
		res.setHeader('Content-Range', 'bytes 0-'+(file.length-1)+'/'+file.length);
		res.setHeader('content-type', 'audio/mp3');
		res.write(file, 'binary');
		res.end();
	},
	api_refresh: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		// Read disk
		let files_raw = mt.lib.fs.readdirSync(music.config.dirMusic);

		// Remove file not mp3 and ext .mp3
		let files = [];
		for (let i=0; i<files_raw.length; i++) {
			let filename = files_raw[i];
			if (filename.substring(filename.length - 4, filename.length) == ".mp3")
				files.push(filename.substring(0, filename.length - 4));
		}

		// Read database
		music.database.connect();
		let datas = music.database.getAllFilename();
		music.database.disconnect();
	
		// Xoa phan tu trung trong files
		for (let i=0; i<datas.length; i++) {
			let data = datas[i];
			for (let j=0; j<files.length; j++) {
				if (files[j] == data.filename) {
					files.splice(j, 1);
					break;
				}
			}
		}

		// Add to result
		let result = [];
		for (let i=0; i<files.length; i++)
			result.push({filename: files[i]});

		// Return
		if (result.length == 0)
			result.push({filename:'empty'});
		res.send(JSON.stringify(result));
	},
	api_add: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		// Add to database
		let data = req.body;
		music.database.connect();
		let datas = music.database.getMusicByFilename(data.filename);
		if (datas.length > 0) {
			datas[0].miss = 0;
			music.database.updateMusic(datas[0]);
		} else {
			music.database.insertMusic(data);
		}
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_edit: function(req, res) {
		
		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		music.database.connect();
		let data = music.database.getById(req.body.id);
		// Rename if other filename
		if (data.filename != req.body.filename) {
			mt.lib.fs.rename(
				mt.lib.path.join(music.config.dirMusic + data.filename + '.mp3'),
				mt.lib.path.join(music.config.dirMusic + req.body.filename + '.mp3'),
				(error) => {
					console.log(error);
				}
			);
		}
		music.database.updateMusic(req.body);
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_remove: function(req, res) {
		
		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		let data = { id:req.body.id, miss:1 };
		music.database.connect();
		music.database.updateMusic(data);
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_cut: function(req, res) {
		
		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		// Get
		this.database.connect();
		let data = this.database.getById(req.body.id);
		this.database.disconnect();

		// Cut
		mt.lib.mp3cutter.cut({
			src: mt.lib.path.join(music.config.dirMusic + data.name + '.mp3'),
			target: mt.lib.path.join(music.config.dirMusic + data.name + ' (track)' + '.mp3'),
			start: 211.00,
			end: 389.12 
		});

		// Add to DB
		try {
			
			music.database.insertTrack(id);

		} catch (e) {
			res.status(300).send("Error: "+e);
			return;
		}

		// Return
		res.status(200).send("Success");
	}
	
};

module.exports = music;
