var mt = null;
var csv = {

	init: function(_mt) {
		mt = _mt;
		mt.lib.register('csv_parse', 'csv-parse/sync');
		mt.lib.register('csv_stringify', 'csv-stringify');
	},

	load: function(filepath) {
		let path = mt.lib.path.join(__dirname, "../../../", filepath);
		let config = {
			delimiter: ",",
			from: 2,
			sync: true,
			skip_empty_lines: true
		};

		const fileContent = mt.lib.fs.readFileSync(path);
		const records = mt.lib.csv_parse.parse(fileContent, config);
		
		let data = [];
		records.forEach((value, index) => data.push({
			id: value[0],
			name: value[1]
		}));

		return data;
	},

	save: function(filepath, data) {
		let path = mt.lib.path.join(__dirname, "../../../", filepath);
		const writableStream = mt.lib.fs.createWriteStream(path);
		const columns = ["id", "name"];
		const stringifier = mt.lib.csv_stringify({ header: true, columns: columns });
		data.forEach((value, index) => stringifier.write({
			id: value.id,
			name: value.name
		}));
		stringifier.pipe(writableStream);
	}

}

module.exports = csv;
