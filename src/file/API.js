import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';

var mtFile = {

	register: function() {
		mt.server.register('GET', '/file/list', (req, res) => this.api_list(req, res));
		mt.server.register('GET', '/file/read', (req, res) => this.api_read(req, res));
		mt.server.register('POST', '/file/write', (req, res) => this.api_write(req, res));
	},

	api_list: function(req, res) {
		try {

			// Input
			let params = req.query || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).send("[ERROR] Missing params: folder");
				return;
			}

			// Pre Process Input
			if (folder[folder.length-1] != '/')
				folder += '/';

			// Liệt kê bên trong folder
			let lstName = fs.readdirSync(folder);
			let result = [];
			for (let name of lstName) {
				let stat = fs.statSync(folder + name);
				result.push({
					name: name,
					size: stat.size,
					date: stat.mtime,
					isFolder: stat.isDirectory(),
				});
			}

			// Return
			res.json(result);
		}
		catch (e) {
			res.status(500).send("[ERROR] "+e);
		}
	},

	api_read: function(req, res) {
		try {

			// Input
			let params = req.query || {};
			let filepath = params.file || '';

			// Validate
			if (filepath.length == 0) {
				res.status(400).send("[ERROR] Missing params: file");
				return;
			}

			// Gửi trực tiếp
			res.sendFile(filepath);
		}
		catch (e) {
			res.status(500).send("[ERROR] "+e);
		}
	},

	api_write: function(req, res) {
		try {

			// Input
			let params = req.query || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).send("[ERROR] Missing params: folder");
				return;
			}

			// Tạo thư mục nếu chưa có
			fs.mkdirSync(folder, { recursive: true });

			// Đọc file
			let filepath = '';
			const busboy = Busboy({ headers: req.headers });

			busboy.on('file', (fieldname, file, filename) => {
				filepath = path.join(folder, filename.filename);
				file.pipe(fs.createWriteStream(filepath));
			});

			busboy.on('finish', () => {
				res.json({
					success: true,
					message: "File uploaded successfully",
					filepath: filepath,
				});
			});

			// Hook pipe
			req.pipe(busboy);
		}
		catch (e) {
			res.status(500).send("[ERROR] "+e);
		}
	},

};
export default mtFile;