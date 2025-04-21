
import fs from 'fs';
import path from 'path';
import sqlite from 'sqlite-sync';
import mp3cutter from 'mp3-cutter';

import mtMusicConfig from './config.js';

var mtMusic = {

	config: mtMusicConfig,
	h_database: './res/database/music.sqlite',
	// database: require('./database'),

	register: function() {

		// Database
		// this.database.init(mt);

		// Sub app
		// require('./admin').register(mt);

		// API
		mt.server.register('POST', '/music/getListMusic', false, (req, res) => this.api_getListMusic(req, res));
		mt.server.register('GET', '/music/getMusic', false, (req, res) => this.api_getMusic(req, res));
		mt.server.register('POST', '/music/refresh', true, (req, res) => this.api_refresh(req, res));
		mt.server.register('POST', '/music/add', true, (req, res) => this.api_add(req, res));
		mt.server.register('POST', '/music/edit', true, (req, res) => this.api_edit(req, res));
		mt.server.register('DELETE', '/music/remove', true, (req, res) => this.api_remove(req, res));
		mt.server.register('POST', '/music/cut', true, (req, res) => this.api_cut(req, res));
	},

	getListMusic: function() {
		let rawdata = fs.readFileSync(mt.app.music.config.fileData);
		let str = rawdata.toString();
		if (str.length == 0) str = '[]';
		let data = JSON.parse(str);
		return data;
	},

	api_getListMusic: function(req, res) {
		try {

			// Get list from database
			// music.database.connect();
			let sql = `
				SELECT id, name, duration, rate, tags, decibel, trackbegin, trackend
				FROM music
				WHERE miss = 0
			`.trimStart();

			let body = req.body || {};

			// Filter include
			let include = body.include;
			if (include != undefined)
				for (let text of include)
					sql += " AND (','||tags||',') LIKE '%,"+text+",%'";

			// Filter exclude
			let exclude = body.exclude;
			if (exclude != undefined)
				for (let text of exclude)
					sql += " AND (','||tags||',') NOT LIKE '%,"+text+",%'";

			sql += " ORDER BY name";

			// Load from Database
			sqlite.connect(this.h_database);
			let data = sqlite.run(sql);
			sqlite.close();

			// Return
			res.json(data);
		}
		catch (e) {
			res.status(500).send("Error: "+e);
		}
	},
	api_getMusic: function(req, res) {
		try {
			let file = null;
			try {
				let filepath = path.join(this.config.dirMusic + req.query.name + '.mp3');
				file = fs.readFileSync(filepath, 'binary');
			}
			catch (e) {
				if (e.code == 'ENOENT') {
					// Không tìm thấy file thì cập nhật là miss
					sqlite.connect(this.h_database);
					sqlite.run(`UPDATE music SET miss = 1 WHERE name = '${req.query.name}'`);
					sqlite.close();
					res.status(404).send("Không tìm thấy file nhạc: "+req.query.name);
					return;
				}
			}
			res.setHeader('accept-ranges', 'bytes');
			res.setHeader('Content-Length', file.length);
			res.setHeader('Content-Range', 'bytes 0-'+(file.length-1)+'/'+file.length);
			res.setHeader('content-type', 'audio/mp3');
			res.write(file, 'binary');
			res.end();
		}
		catch (e) {
			res.status(500).send("Error: "+e);
		}
	},
	api_refresh: function(req, res) {
		try {

			// Authorize
			if (!mt.util.authorize(req)) {
				res.status(403).send("Access denied");
				return;
			}

			// Read disk
			let files_raw = fs.readdirSync(this.config.dirMusic);

			// Remove file not mp3 and ext .mp3
			let files = [];
			for (let i=0; i<files_raw.length; i++) {
				let filename = files_raw[i];
				if (filename.substring(filename.length - 4, filename.length) == ".mp3")
					files.push(filename.substring(0, filename.length - 4));
			}

			// Read database
			sqlite.connect(this.h_database);
			let datas = sqlite.run('SELECT name FROM music WHERE miss = 0');
			let listFileName = [];
			for (let data of datas)
				listFileName.push(data.name);
			sqlite.close();

			// Danh sach file nhạc mới
			let lstNewMusic = [];
			for (let file of files) {
				if (listFileName.indexOf(file) == -1)
					lstNewMusic.push({ name: file });
			}
			if (lstNewMusic.length == 0)
				lstNewMusic.push({'name':'empty'});

			// Return
			res.send(JSON.stringify(lstNewMusic));
		}
		catch (e) {
			res.status(500).send("Error: "+e);
		}
	},
	api_add: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		// Add to database
		let data = req.body;
		music.database.connect();
		let datas = music.database.getMusicByFilename(data.filename);
		if (datas.length > 0) {
			datas[0].miss = 0;
			music.database.updateMusic(datas[0]);
		} else {
			music.database.insertMusic(data);
		}
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_edit: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		music.database.connect();
		let data = music.database.getById(req.body.id);
		// Rename if other filename
		if (data.filename != req.body.filename) {
			fs.rename(
				path.join(music.config.dirMusic + data.filename + '.mp3'),
				path.join(music.config.dirMusic + req.body.filename + '.mp3'),
				(error) => {
					console.log(error);
				}
			);
		}
		music.database.updateMusic(req.body);
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_remove: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		let data = { id:req.body.id, miss:1 };
		music.database.connect();
		music.database.updateMusic(data);
		music.database.disconnect();

		// Return
		res.status(200).send("Success");
	},
	api_cut: function(req, res) {

		// Authorize
		if (!mt.util.authorize(req)) {
			res.status(403).send("Access denied");
			return;
		}

		// Get
		this.database.connect();
		let data = this.database.getById(req.body.id);
		this.database.disconnect();

		// Cut
		mp3cutter.cut({
			src: path.join(music.config.dirMusic + data.name + '.mp3'),
			target: path.join(music.config.dirMusic + data.name + ' (track)' + '.mp3'),
			start: 211.00,
			end: 389.12
		});

		// Add to DB
		try {
			music.database.insertTrack(id);
		}
		catch (e) {
			res.status(300).send("Error: "+e);
			return;
		}

		// Return
		res.status(200).send("Success");
	}

};
export default mtMusic;