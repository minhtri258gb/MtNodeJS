var mt = null;
var database = {

	struct: {
		anime: ["name", "story", "art", "sound", "fantasy", "sad", "joke", "brand", "review", "end", "character"],
	},

	init: function(_mt) {
		mt = _mt;
		mt.lib.register('sqlite', 'sqlite-sync');
	},

	connect: function() {
		mt.lib.sqlite.connect("./server/manager/db.sqlite");
	},

	disconnect: function() {
		mt.lib.sqlite.close();
	},

	query: function(sql) {
		return mt.lib.sqlite.run(sql);
	},

	insert: function(table, data) {
		// let struct = this.struct[table];
		// let sKey = '', sParam = '';
		// let arrValue = [];
		// for (let i=0; i<struct.length; i++) {
		// 	sKey = sKey + ',' + struct[i];
		// 	sParam = sParam + ',' + '?';
		// 	let value = data[struct[i]];
		// 	if (value == undefined)
		// 		value = null;
		// 	arrValue.push(value);
		// }
		// sKey = sKey.substring(1);
		// sParam = sParam.substring(1);

		// let sql = "INSERT INTO " + table + "(" + sKey + ") VALUES (" + sParam + ");";

		// this.db.run(sql, arrValue, callback);

		//=================================================

		delete data.id;
		mt.lib.sqlite.insert(table, data, function(newID) {});
	},
	 
	update: function(table, data) {
		// let struct = this.struct[table];
		// let values = [];

		// let sql = "";
		// for (let i=0; i<struct.length; i++) {
		// 	let value = data[struct[i]];
		// 	if (value == undefined)
		// 		value = null;
		// 	sql += ',' + struct[i] + "=?";
		// 	values.push(value);
		// }
		// sql = "UPDATE " + table + " SET " + sql.substring(1) + "WHERE id=?;";
		
		// db.run(sql, values, callback);

		//=================================================

		let id = data.id;
		delete data.id;
		var rows_modified = mt.lib.sqlite.update(table, data, {id:id});
	},

	select: function(table) {
		let sql = "SELECT * FROM " + table + " ORDER BY id DESC";
		return mt.lib.sqlite.run(sql);

		// let sql = "SELECT * FROM " + table + ";";
		// db.get(sql, [], callback
		// [key],
		// function(err, row) { 
		// 	if(row == undefined)
		// 		callback("Something wrong");
		// 	else if(err) 
		// 		callback(err);
		// 	else
		// 		callback(null, row);
		// });
	},

	anime: {

		search: function(filter) {
			
			// SQL, Filter
			let sql = "SELECT * FROM anime WHERE 1=1";
			if (filter.text && filter.text.length > 0) {
				sql += " and name LIKE '%" + filter.text + "%'";
			}

			// Sql Count
			let sqlCount = "SELECT count(id) n FROM ("+sql+")";

			// Sort
			if (filter.sort) {
				if (!filter.order) filter.order = 'asc'
				sql += " ORDER BY " + filter.sort + " " + filter.order;
			} else {
				sql += " ORDER BY id DESC";
			}

			// KPaging
			if (filter.page && filter.rows) {
				let offset = (filter.page-1) * filter.rows;
				sql += " LIMIT " + filter.rows + " OFFSET " + offset;
			}
			
			// Query
			database.connect();
			let total = database.query(sqlCount)[0].n;
			let rows = database.query(sql);
			database.disconnect();

			return { total: total, rows: rows };
		}

	},

	account: {

		search: function(filter) {

			// SQL, Filter
			let sql = "SELECT * FROM account WHERE 1=1";
			if (filter.text && filter.text.length > 0) {
				sql += " and name LIKE '%" + filter.text + "%'";
			}

			// Sql Count
			let sqlCount = "SELECT count(id) n FROM ("+sql+")";

			// Sort, KPaging
			if (filter.sort) {
				if (!filter.order) filter.order = 'asc'
				sql += " ORDER BY " + filter.sort + " " + filter.order;
			} else {
				sql += " ORDER BY id DESC";
			}
			if (filter.page && filter.rows) {
				let offset = (filter.page-1) * filter.rows;
				sql += " LIMIT " + filter.rows + " OFFSET " + offset;
			}
			
			// Query
			database.connect();
			let total = database.query(sqlCount)[0].n;
			let rows = database.query(sql);
			database.disconnect();

			return { total: total, rows: rows };
		},

		save: function(data) {
			database.connect();
			if (data.id == 0) {
				delete data.id;
				mt.lib.sqlite.insert("account", data, function(newID) {});
			} else {
				let id = data.id;
				delete data.id;
				var rows_modified = mt.lib.sqlite.update("account", data, {id:id});
			}
			database.disconnect();
		}

	}

};

module.exports = database;
