var mt = null;
var game = {

	h_debug: true,
	
	m_db: null,

	init: function(_mt, _db) {
		mt = _mt;
		this.m_db = _db;
		try {

			// API
			mt.core.app.get("/manager/game/grid", this.api_search);
			mt.core.app.post("/manager/game/grid", this.api_action);
		}
		catch (e) {
			console.error('[manager/game] init', e); // Log
		}
	},
	api_search: function(req, res) { // Phân trang
		let params = JSON.parse(req.query.request || '');

		// Authorize
		// if (!mt.util.authorize(req)) {
		// 	res.status(403).send("Access denied");
		// 	return;
		// }

		// SQL
		let sql = "SELECT * FROM game";

		// Filter
		if (params.search != undefined && params.search.length > 0) {
			let logic = params.searchLogic || 'OR';
			sql += (logic == 'OR') ? " WHERE 1=0" : " WHERE 1=1"
			for (let field of params.search) {
				if (field.type == 'text')
					sql += ` ${logic} ${field.field} LIKE '%${field.value}%'`;
			}
		}

		// Sql Count
		let sqlCount = "SELECT count(id) n FROM ("+sql+")";

		// Sort
		if (params.sort) {
			sql += " ORDER BY ";
			for (let field of params.sort)
				sql += field.field + " " + field.direction + ", ";
			sql = sql.substring(0, sql.length - 2); // Bỏ dấu phẩy cuối
		}
		else
			sql += " ORDER BY time DESC";

		// Phân trang
		if (params.limit != null && params.offset != null)
			sql += " LIMIT " + params.limit + " OFFSET " + params.offset;
		
		// Query
		let db = game.m_db;
		db.connect();
		let total = db.query(sqlCount)[0].n;
		let rows = db.query(sql);
		db.disconnect();

		// Query
		res.json({ total: total, records: rows });
	},
	api_action: function(req, res) {
		try {

			let params = JSON.parse(req.query.request || '');
	
			// Authorize
			// if (!mt.util.authorize(req)) {
			// 	res.status(403).send("Access denied");
			// 	return;
			// }
	
			let db = game.m_db;
			db.connect();
			for (let row of params.changes) {
	
				// Ngày cập nhật
				row.time = Math.floor(Date.now() / 1000);

				// Boolean
				if (row.three != null)
					row.three = row.three ? 1 : 0;
				if (row.coop != null)
					row.coop = row.coop ? 1 : 0;
	
				if (row.id < 0) // Add
					db.insert("game", row);
				else // Edit
					db.update("game", row);
			}
			db.disconnect();
	
			// Response
			res.json({ err: false });
		}
		catch (e) {
			res.status(300).json({ err: true, dtl: e });
		}
	},

	game: {
		action: false,
		save: function(req, res) {
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			let data = req.body.data;
			let d = new Date();
			data.updateTime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

			manager.m_db.connect();
			if (data.id == 0)
				manager.m_db.insert("game", data);
			else
				manager.m_db.update("game", data);
			manager.m_db.disconnect();

			res.end("Success");
		}
	},
	

};

module.exports = game;
