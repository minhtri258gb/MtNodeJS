import sqlite from 'sqlite-sync';

var mtDatabase = {

	register: function() {
		mt.core.app.post('/database/query', (req, res) => this.api_query(req, res));
	},

	api_query: function(req, res) {
		try {

			// Input
			let body = req.body || {};
			let dbName = body.database || '';
			let sql = body.sql || '';

			// Validate
			if (dbName.length == 0) {
				res.status(400).send("[ERROR] Missing params: database");
				return;
			}
			if (sql.length == 0) {
				res.status(400).send("[ERROR] Missing params: sql");
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

};
export default mtDatabase;