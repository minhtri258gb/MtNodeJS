import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
// import bodyParser from 'body-parser';

var mtServer = {
	c_app: null, // express app
	c_server: null, // http server

	setup: function () {

		// Init app
		this.c_app = express();

		// Register default
		this.c_app.use(cors());
		this.c_app.use('/', express.static(mt.config.clientPath)); // Static
		this.c_app.get('/', (req, res) => { // Home
			res.sendFile(path.join(__dirname, '../', mt.config.clientPath, '/home/index.html'));
		});
		this.c_app.use(express.json());
		// this.c_app.use(mt.lib.bodyParser.json()); // to support JSON-encoded bodies
		// this.c_app.use(mt.lib.bodyParser.urlencoded({ // to support URL-encoded bodies
		// 	extended: true
		// }));
	},

	start: function () {

		this.c_server = http.createServer(this.c_app);
		this.c_server.listen(mt.config.port, () => {
			console.log(`Server online: http://localhost:${mt.config.port}`);
		});
		this.c_server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.error(`[ERROR] Port ${mt.config.port} đã được sử dụng. Vui lòng chọn port khác.`);
				process.exit(1); // Thoát ứng dụng nếu lỗi
			}
			else
				console.error('[ERROR]', err);
		});
	},

	register: function(method, url, callback) {
		if (method == 'GET')
			this.c_app.get(url, callback);
		else if (method == 'POST')
			this.c_app.post(url, callback);
		else if (method == 'PUT')
			this.c_app.put(url, callback);
		else if (method == 'DELETE')
			this.c_app.delete(url, callback);
	},
};
export default mtServer;