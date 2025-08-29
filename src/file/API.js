import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Busboy from 'busboy';

var mtFile = {
	m_registerFolder: {}, // Lưu các

	register() {

		// General
		mt.server.register('GET', '/file/list', true, (req, res) => this.api_list(req, res));
		mt.server.register('GET', '/file/read', true, (req, res) => this.api_read(req, res));
		mt.server.register('POST', '/file/write', true, (req, res) => this.api_write(req, res));
		mt.server.register('POST', '/file/writeText', true, (req, res) => this.api_writeText(req, res));
		mt.server.register('POST', '/file/register', true, (req, res) => this.api_register(req, res));
		mt.server.register('GET', '/file/static', false, (req, res) => this.api_static(req, res));

		// System
		mt.server.register('GET', '/file/getClientPath', true, (req, res) => this.api_getClientPath(req, res));

		// Support JsTree
		mt.server.register('GET', '/file/jstree', true, (req, res) => this.api_jstree(req, res));
	},

	api_list(req, res) {
		try {

			// Input
			let params = req.query || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).send('[mt.file.api_list] Thiếu params "folder"');
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
		catch (ex) {
			res.status(500).send(`[mt.file.api_list] Exception: ${ex}`);
		}
	},
	api_read(req, res) {
		try {

			// Input
			let params = req.query || {};
			let filepath = params.file || '';

			// Validate
			if (filepath.length == 0) {
				res.status(400).send('[mt.file.api_read] Thiếu params "file"');
				return;
			}

			// Gửi trực tiếp
			res.sendFile(filepath);
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_read] Exception: ${ex}`);
		}
	},
	api_write(req, res) {
		try {

			// Input
			let params = req.query || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).send('[mt.file.api_write] Thiếu params "folder"');
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
		catch (ex) {
			res.status(500).send(`[mt.file.api_write] Exception: ${ex}`);
		}
	},
	api_writeText(req, res) {
		try {

			// Input
			let paramsQuery = req.query || {};
			let filePath = paramsQuery.file || '';
			let force = paramsQuery.force === 'true';

			// Input
			let content = req.body || '';

			// Validate
			if (filePath.length == 0) {
				res.status(400).send('[mt.file.api_writeText] Thiếu params url "file"');
				return;
			}
			if (content.length == 0) {
				res.status(400).send('[mt.file.api_writeText] Thiếu params body');
				return;
			}

			// Lấy folder
			const folderPath = path.dirname(filePath);
			if (fs.existsSync(folderPath) == false)
				fs.mkdirSync(folderPath, { recursive: true });

			// Kiểm tra file tồn tại
			if (!force && fs.existsSync(filePath)) {
				res.status(400).send(`[mt.file.api_writeText] Tệp "${filePath}" đã tồn tại!`);
				return;
			}

			// Ghi file
			fs.writeFileSync(filePath, content);

			// Return
			res.send("Thành công");
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_write] Exception: ${ex}`);
		}
	},
	api_register(req, res) {
		try {

			// Input
			let params = req.body || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).send('[mt.file.api_register] Thiếu params "folder"');
				return;
			}
			if (!fs.existsSync(folder)) {
				res.status(400).send(`[mt.file.api_register] Không tìm thấy thư mục "${folder}"`);
				return;
			}

			// Chuẩn hóa đường dẫn
			folder = folder.replaceAll('\\', '/'); // Thay \\ thành /
			if (folder[folder.length-1] == '/') // Bỏ dấu / cuối
				folder = folder.substr(0, folder.length-1);

			// Lưu thư mục đã phân quyền
			if (this.m_registerFolder[folder] == undefined)
				this.m_registerFolder[folder] = true;

			// Response
			res.send('Đã đăng ký đường dẫn');
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_register] Exception: ${ex}`);
		}
	},
	api_static(req, res) {
		try {

			// Input
			let params = req.query || {};
			let filepath = params.file || '';
			let folderpath = params.folder || '';

			// Validate
			if (filepath.length == 0) {
				res.status(400).send('[mt.file.api_static] Thiếu params "file"');
				return;
			}
			if (folderpath.length == 0) {
				res.status(400).send('[mt.file.api_static] Thiếu params "folder"');
				return;
			}

			// Chuẩn hóa đường dẫn
			filepath = filepath.replaceAll('\\', '/'); // Thay \\ thành /
			folderpath = folderpath.replaceAll('\\', '/'); // Thay \\ thành /
			if (folderpath[folderpath.length-1] == '/') // Bỏ dấu / cuối
				folderpath = folderpath.substr(0, folder.length-1);

			if (this.m_registerFolder[folderpath] !== true) {
				res.status(400).send(`[mt.file.api_static] Chưa đăng ký thư mục tĩnh "${folderpath}"`);
				return;
			}

			// Gửi trực tiếp
			res.sendFile(folderpath + '/' + filepath);
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_static] Exception: ${ex}`);
		}
	},
	api_getClientPath(req, res) {
		try {

			// Thư mục Client
			const clientPathTmp = process.env.CLIENT_PATH;

			// Tìm đường dẫn thư mục gốc
			const filepath = fileURLToPath(import.meta.url);
			const folderpath = path.dirname(filepath);
			const clientPath = path.resolve(folderpath, '../../', clientPathTmp);

			res.send(clientPath);
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_getClientPath] Exception: ${ex}`);
		}
	},
	api_jstree(req, res) {
		try {

			// Input
			let params = req.query || {};
			let folder = params.folder || '';

			// Validate
			if (folder.length == 0) {
				res.status(400).json({ id: 0 });
				return;
			}

			// Pre Process Input
			if (folder[folder.length-1] != '/')
				folder += '/';

			// Liệt kê bên trong folder
			let lstName = fs.readdirSync(folder);
			let result = [];
			for (let name of lstName) {
				let fullpath = path.join(folder, name);
				let stat = fs.statSync(fullpath);
				let isFolder = stat.isDirectory();
				let item = {
					text: name, // Hiển thị
					path: fullpath, // Path tới node
					isFolder: isFolder, // Là thư mục?
				};
				if (!isFolder) {
					item = Object.assign(item, {
						size: stat.size, // Kích thước
						date: stat.mtime, // Thời gian chỉnh sửa
					});
				}
				result.push(item);
			}

			// Return
			res.json(result);
		}
		catch (ex) {
			res.status(500).send(`[mt.file.api_jstree] Exception: ${ex}`);
		}
	},

};
export default mtFile;