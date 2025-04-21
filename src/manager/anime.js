
var anime = {

	h_debug: true,
	
	m_db: null,

	init: function(_db) {
		this.m_db = _db;
		try {

			// API
			mt.server.register('GET', "/manager/anime/grid", true, this.api_search);
			mt.server.register('POST', "/manager/anime/grid", true, this.api_action);

			// Log
			if (this.h_debug)
				console.log('[manager/anime] init - Done');
		}
		catch (e) {
			console.error('[manager/anime] init', e); // Log
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
		let sql = "SELECT * FROM anime";

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
		let db = anime.m_db;
		db.connect();
		let total = db.query(sqlCount)[0].n;
		let rows = db.query(sql);
		db.disconnect();

		// Query
		res.json({ total: total, records: rows });
	},
	api_action: function(req, res) {
		let params = JSON.parse(req.query.request || '');

		// Authorize
		// if (!mt.util.authorize(req)) {
		// 	res.status(403).send("Access denied");
		// 	return;
		// }

		let db = anime.m_db;
		db.connect();
		for (let row of params.changes) {

			// Ngày cập nhật
			row.time = Math.floor(Date.now() / 1000);

			if (row.id < 0) // Add
				db.insert("anime", row);
			else // Edit
				db.update("anime", row);
		}
		db.disconnect();

		// Response
		res.json({ err: false });
	},

};

module.exports = anime;
