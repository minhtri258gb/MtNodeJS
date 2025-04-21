import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
// import bodyParser from 'body-parser';

var mtServer = {
	c_app: null, // express app
	c_server: null, // http server
	m_port: 80,

	setup: function () {

		// Đọc từ biến môi trường
		this.m_port = process.env.PORT || 80;

		// Init app
		this.c_app = express();

		// Register default
		this.c_app.use(cors());
		this.c_app.use('/', express.static(mt.config.clientPath)); // Static
		this.c_app.get('/', (req, res) => { // Home
			res.sendFile(path.join(__dirname, '../', mt.config.clientPath, '/home/index.html'));
		});
		this.c_app.use(express.json()); // Dùng body JSON
	},

	start: function () {

		this.c_server = http.createServer(this.c_app);
		this.c_server.listen(this.m_port, () => {
			console.log(`Server online: http://localhost:${this.m_port}`);
		});
		this.c_server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.error(`[ERROR] Port ${this.m_port} đã được sử dụng. Vui lòng chọn port khác.`);
				process.exit(1); // Thoát ứng dụng nếu lỗi
			}
			else
				console.error('[ERROR]', err);
		});
	},

	register: function(method, url, authen, callback) {
		if (method == 'GET') {
			if (authen)
				this.c_app.get(url, mt.authen.protected, callback);
			else
				this.c_app.get(url, callback);
		}
		else if (method == 'POST') {
			if (authen)
				this.c_app.post(url, mt.authen.protected, callback);
			else
				this.c_app.post(url, callback);
		}
		else if (method == 'PUT') {
			if (authen)
				this.c_app.put(url, mt.authen.protected, callback);
			else
				this.c_app.put(url, callback);
		}
		else if (method == 'DELETE') {
			if (authen)
				this.c_app.delete(url, mt.authen.protected, callback);
			else
				this.c_app.delete(url, callback);
		}
	},
};
export default mtServer;