var mt = null;
var app = {

	init: function(_mt) {
		mt = _mt;
		
		// Library
		mt.lib.register('formidable', 'formidable');

		// API
		// mt.core.app.put("/image/upload", function(req, res) {

		// 	var form = new mt.lib.formidable.IncomingForm();
		// 	var index, filename;

		// 	form.parse(req);

		// 	form.on('field', function(name, value) {
		// 		console.log(name);
		// 		console.log(value);
		// 		if (name == 'index') index = value;
		// 	});

		// 	form.on('fileBegin', function(name, file) {
		// 		console.log(file);
		// 		file.path = mt.lib.path.join(__dirname, "../res/uploads/", file.name);
		// 	});
			
		// 	form.on('file', function(name, file) {
		// 		filename = file.name;
		// 	});

		// 	form.on('end', function() {
		// 		console.log('end');
		// 		res.json({
		// 			index: index,
		// 			filename: filename
		// 		});
		// 	});

		// 	form.on('error', function () {
		// 		res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
		// 	});
		// });

	}
}

module.exports = app;
