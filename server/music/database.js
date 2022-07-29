var mt = null;
var database = {

	struct: {
		music: [],
		music_tag: [],
		music_tag_map: []
	},

	init: function(_mt) {
		mt = _mt;
		mt.lib.register('sqlite', 'sqlite-sync');
	},

	connect: function() {
		mt.lib.sqlite.connect("./server/music/db.sqlite");
	},

	disconnect: function() {
		mt.lib.sqlite.close();
	},

	insertMusic: function(data) {
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

		if (data.id != undefined)
			delete data.id;
		mt.lib.sqlite.insert("music", data, function(newID) {});
	},
	 
	updateMusic: function(data) {
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
		var rows_modified = mt.lib.sqlite.update("music", data, {id:id});
	},

	selectAll: function() {
		return mt.lib.sqlite.run("SELECT * FROM music WHERE miss = 0 ORDER BY name");

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

	// Advanced
	getAllName: function() {
		return mt.lib.sqlite.run("SELECT name FROM music WHERE miss = 0");
	},

	miss: function(name) {
		let rows_modified = 0;
		let datas = this.getMusicByName(name);
		if (datas.length > 0) {
			let data = datas[0];
			data.miss = 1;
			let id = data.id;
			delete data.id;
			rows_modified = mt.lib.sqlite.update("music", data, {id:id});
		}
		return rows_modified;
	},

	getMusicByName: function(name) {
		return mt.lib.sqlite.run("SELECT * FROM music WHERE name = \""+name+"\"");
	}

};

module.exports = database;
