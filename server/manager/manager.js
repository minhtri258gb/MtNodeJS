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
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/manager.html'));
		});
	},

	init: function() {

		// Database
		this.database.init(mt);
		
		// API
		mt.core.app.get("/manager/anime", this.anime.getPage);
		mt.core.app.get("/manager/film", function(req, res) {
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/film.html'));
		});
		mt.core.app.get("/manager/movie", function(req, res) {
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/movie.html'));
		});
		mt.core.app.get("/manager/manga", function(req, res) {
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/manga.html'));
		});
		mt.core.app.get("/manager/game", function(req, res) {
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/game.html'));
		});
		mt.core.app.get("/manager/account", function(req, res) {
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/account.html'));
		});

	},

	anime: {
		action: false,
		getPage: function(req, res) {
			if (!mt.app.manager.anime.action) {
				mt.app.manager.anime.action = true;
				mt.app.manager.anime.init();
			}
			res.sendFile(mt.lib.path.join(__dirname, '../../client', '/manager/anime.html'));
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

			manager.database.connect();
			let total = manager.database.count("anime");
			let rows = manager.database.selectPagination("anime", req.body.page, req.body.rows);
			manager.database.disconnect();
			res.end(JSON.stringify({ total: total, rows: rows }));
		},
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			let data = req.body.data;

			manager.database.connect();
			if (data.id == 0)
				manager.database.insert("anime", data);
			else
				manager.database.update("anime", data);
			manager.database.disconnect();

			res.end("Success");
		}
	},
	
	film: {},
	
	movie: {},
	
	manga: {},
	
	game: {},
	
	account: {},


};

module.exports = manager;
