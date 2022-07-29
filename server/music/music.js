var mt = null;
var music = {

	config: require('./config'),
	database: require('./database'),

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/music", this.view);
	},

	view: function(req, res) {
		if (mt.app.music == undefined) {
			mt.app.music = music;
			music.init();
		}
		res.sendFile(mt.lib.path.join(__dirname, '../../client', '/music/music.html'));
	},

	init: function() {

		// Database
		this.database.init(mt);

		// Sub app
		require('./admin').register(mt);

		// API
		mt.core.app.post("/music/getListMusic", this.api_getListMusic);
		mt.core.app.get("/music/getMusic", this.api_getMusic);
		mt.core.app.post("/music/refresh", this.api_refresh);
		mt.core.app.post("/music/add", this.api_add);
		mt.core.app.post("/music/edit", this.api_edit);
		mt.core.app.delete("/music/remove", this.api_remove);
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
		res.json({ total: dataFillter.length, rows: dataFillter });
	},
	api_getMusic: function(req, res) {
		let file = null;
		try {
			file = mt.lib.fs.readFileSync(mt.lib.path.join(music.config.dirMusic + req.query.name + '.mp3'), 'binary');
		} catch (e) {
			if (e.code == 'ENOENT') {
				music.database.connect();
				music.database.miss(req.query.name);
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
			let name = files_raw[i];
			if (name.substring(name.length - 4, name.length) == ".mp3")
				files.push(name.substring(0, name.length - 4));
		}

		// Read database
		music.database.connect();
		let datas = music.database.getAllName();
		music.database.disconnect();
	
		// Xoa phan tu trung trong files
		for (let i=0; i<datas.length; i++) {
			let data = datas[i];
			for (let j=0; j<files.length; j++) {
				if (files[j] == data.name) {
					files.splice(j, 1);
					break;
				}
			}
		}

		// Add to result
		let result = [];
		for (let i=0; i<files.length; i++)
			result.push({name: files[i]});

		// Return
		if (result.length == 0)
			result.push({name:'empty'});
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
		let datas = music.database.getMusicByName(data.name);
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

		let data = req.body;
		music.database.connect();
		music.database.updateMusic(data);
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
	}
	
};

module.exports = music;
