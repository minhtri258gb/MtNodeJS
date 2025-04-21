import sqlite from 'sqlite-sync';

var mtDatabase = {

	register: function() {
		mt.server.register('POST', '/database/query', true, (req, res) => this.api_query(req, res));
		mt.server.register('POST', '/database/tabulator', true, (req, res) => this.api_tabulator(req, res));
	},

	api_query: function(req, res) {
		try {

			// Input
			let body = req.body || {};
			let dbName = body.database || '';
			let sql = body.sql || '';
			sql = sql.trim();

			// Validate
			if (dbName.length == 0) {
				res.status(400).send("[ERROR] Missing body: database");
				return;
			}
			if (sql.length == 0) {
				res.status(400).send("[ERROR] Missing body: sql");
				return;
			}

			// Process input
			let dbPath = './res/database/' + dbName + '.sqlite';

			// Run Database
			sqlite.connect(dbPath);
			let data = sqlite.run(sql);
			sqlite.close();

			// Return
			res.json(data);
		}
		catch (e) {
			res.status(500).send("[ERROR] "+e);
		}
	},
	api_tabulator: function(req, res) {
		try {

			// Input
			let body = req.body || {};
			let dbName = body.database || '';
			let select = body.select || '';
			let from = body.from || '';
			let where = body.where || '';
			let size = body.size || -1;
			let page = body.page || -1;
			let sort = body.sort || [];

			// Validate
			if (dbName.length == 0) {
				res.status(400).send("[ERROR] Missing body: database");
				return;
			}
			if (from.length == 0) {
				res.status(400).send("[ERROR] Missing body: from");
				return;
			}

			// Process input
			let dbPath = './res/database/' + dbName + '.sqlite';
			if (select.length == 0)
				select = "*";
			if (where.length == 0)
				where = "1=1";
			if (sort.length == 0)
				sort.push({field: 'id', dir: 'desc'});

			let isPaging = (size > 0 && page > 0);

			// Build Sort
			let sqlSort = '';
			for (let field of sort)
				sqlSort += ',' + field.field + ' ' + field.dir;
			sqlSort = sqlSort.substring(1);

			// Build Condition
			let sqlCond = where;
			// #TODO

			// Build Query
			let sql = `
				SELECT ${select}
				FROM ${from}
				WHERE ${sqlCond}
				ORDER BY ${sqlSort}
				${isPaging ? "LIMIT " + (size * (page - 1)) + ", " + size : ""}
			`.trim();

			// Build Query Count
			let sqlCount = `SELECT COUNT(1) as total FROM ${from} WHERE ${sqlCond}`;

			// Run Database
			let count = null;
			sqlite.connect(dbPath);
			let data = sqlite.run(sql);
			if (isPaging)
				count = sqlite.run(sqlCount);
			sqlite.close();

			// Check Error
			if (data.error)
				data.error.sql = sql;

			// Return
			if (isPaging) {
				let maxPage = Math.ceil(count[0].total / size);
				res.json({ data, last_page: maxPage });
			}
			else
				res.json(data);
		}
		catch (e) {
			res.status(500).send("[ERROR] "+e);
		}
	}

};
export default mtDatabase;