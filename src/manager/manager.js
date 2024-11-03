var mt = null;
var manager = {

	h_debug: true,
	
	m_db: require('./database'),

	// register: function(_mt) {
	// 	mt = _mt;
	// 	mt.core.app.get("/manager", function(req, res) {
	// 		if (!mt.util.authorize(req)) {
	// 			res.status(403).send("Access denied");
	// 			return;
	// 		}
			
	// 		if (mt.app.manager == undefined) {
	// 			mt.app.manager = manager;
	// 			manager.init();
	// 		}
	// 		res.sendFile(mt.lib.path.resolve(__dirname+"/../../"+mt.config.client_path+"/manager/index.html"));
	// 	});
	// },

	init: function(_mt) {
		mt = _mt;
		try {

			// Database
			this.m_db.init(mt);

			// API
			mt.core.app.post("/manager/init", this.api_init);

			// Log
			if (this.h_debug)
				console.log('[manager/manager] init - Done');
		}
		catch (e) {
			console.error('[manager/manager] init', e); // Log
		}
	},
	api_init: function(req, res) {
		try {

			// Process body
			let name = req.body?.app || '';

			// Validate
			if (name.length == 0)
				throw { error: true, msg: 'Không tìm thấy tên App' };

			// Register app
			if (manager[name] == undefined) {
				manager[name] = require(`./${name}.js`);
				manager[name].init(mt, manager.m_db);

				// Response
				res.status(200).json({ err: false, msg: "App init" });
			}
			else {

				// Response
				res.status(201).json({ err: false, msg: "App already" });
			}
		}
		catch (e) {
			res.status(300).json({ err: true, dtl: e });
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
			res.json(manager.m_db.account.search(filter));
		},
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}
			manager.m_db.account.save(req.body.data);
			res.end("Success");
		}
	},

};

module.exports = manager;
