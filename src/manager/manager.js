var mt = null;
var manager = {
	
	database: require('./database'),

	register: function(_mt) {
		mt = _mt;
		mt.core.app.get("/manager", function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}
			
			if (mt.app.manager == undefined) {
				mt.app.manager = manager;
				manager.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/manager.html"));
		});
	},

	init: function() {

		// Database
		this.database.init(mt);
		
		// API
		mt.core.app.get("/manager/anime", this.anime.getPage);
		mt.core.app.get("/manager/film", this.film.getPage);
		mt.core.app.get("/manager/movie", this.movie.getPage);
		mt.core.app.get("/manager/manga", this.manga.getPage);
		mt.core.app.get("/manager/game", this.game.getPage);
		mt.core.app.get("/manager/account", this.account.getPage);
	},

	anime: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.anime.action) {
				mt.app.manager.anime.action = true;
				mt.app.manager.anime.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/anime.html"));
		},
		init: function() {

			// Register API
			mt.core.app.post("/manager/anime/search", this.search);
			mt.core.app.post("/manager/anime/save", this.save);
		},
		search: function(req, res) {

			// Authorize
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			// Filter
			let filter = {};
			if (req.body) {
				filter = {
					page: req.body.page || null,
					rows: req.body.rows || null,
					sort: req.body.sort || null,
					order: req.body.order || null,
					text: req.body.text || null
				};
			}

			// Query
			res.json(manager.database.anime.search(filter));
		},
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			let data = req.body.data;
			let d = new Date();
			data.updateTime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

			manager.database.connect();
			if (data.id == 0)
				manager.database.insert("anime", data);
			else
				manager.database.update("anime", data);
			manager.database.disconnect();

			res.end("Success");
		}
	},
	
	film: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.film.action) {
				mt.app.manager.film.action = true;
				mt.app.manager.film.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/film.html"));
		},
		init: function() {

			// Register API
		},
	},
	
	movie: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.movie.action) {
				mt.app.manager.movie.action = true;
				mt.app.manager.movie.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/movie.html"));
		},
		init: function() {

			// Register API
		},
	},
	
	manga: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.manga.action) {
				mt.app.manager.manga.action = true;
				mt.app.manager.manga.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/manga.html"));
		},
		init: function() {

			// Register API
		},
	},
	
	game: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.game.action) {
				mt.app.manager.game.action = true;
				mt.app.manager.game.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/game.html"));
		},
		init: function() {

			// Register API
			mt.core.app.post("/manager/game/search", this.search);
			mt.core.app.post("/manager/game/save", this.save);
		},
		search: function(req, res) {

			// Authorize
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			// Filter
			let filter = {};
			if (req.body) {
				filter = {
					page: req.body.page || null,
					rows: req.body.rows || null,
					sort: req.body.sort || null,
					order: req.body.order || null,
					text: req.body.text || null
				};
			}

			// Query
			res.json(manager.database.game.search(filter));
		},
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			let data = req.body.data;
			let d = new Date();
			data.updateTime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

			manager.database.connect();
			if (data.id == 0)
				manager.database.insert("game", data);
			else
				manager.database.update("game", data);
			manager.database.disconnect();

			res.end("Success");
		}
	},
	
	account: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.account.action) {
				mt.app.manager.account.action = true;
				mt.app.manager.account.init();
			}
			res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/account.html"));
		},
		init: function() {

			// Register API
			mt.core.app.post("/manager/account/search", this.search);
			mt.core.app.post("/manager/account/save", this.save);
		},
		search: function(req, res) {

			// Authorize
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			// Filter
			let filter = {};
			if (req.body) {
				filter = {
					page: req.body.page || null,
					rows: req.body.rows || null,
					sort: req.body.sort || null,
					order: req.body.order || null,
					text: req.body.text || null
				};
			}

			// Query
			res.json(manager.database.account.search(filter));
		},
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}
			manager.database.account.save(req.body.data);
			res.end("Success");
		}
	},

};

module.exports = manager;
