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

	selectPagination: function(table, page, rows) {

		let offset = (page-1) * rows;
		let sql = "SELECT * FROM "+table+" ORDER BY id DESC LIMIT "+rows+" OFFSET "+offset;
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

	count: function(table) {
		let sql = "SELECT count(id) n FROM " + table;
		let result = mt.lib.sqlite.run(sql);
		return result[0].n;
	}

};

module.exports = database;
