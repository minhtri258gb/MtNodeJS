
import fs from 'fs';
import path from 'path';
import sqlite from 'sqlite-sync';
// import mp3cutter from 'mp3-cutter';

// import mtMusicConfig from './config.js';

var mtMap = {
	m_isConnect: false,

	register: function() {

		// API
		mt.server.register('GET', '/map/tiles', false, (req, res) => this.api_getTiles(req, res));
	},

	api_getTiles: function(req, res) {
		try {

			if (!this.m_isConnect) {
				const mbtilesPath = path.join(process.cwd(), '/res/map/vietnam.mbtiles');
				sqlite.connect(mbtilesPath);
			}

			let x = +req.query.x;
			let y = +req.query.y;
			let z = +req.query.z;
			const flippedY = Math.pow(2, z) - 1 - y;
			
			const row = sqlite.run('SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?', [z, x, flippedY] );
			// sqlite.close();

			if (row.length > 0) {
				res.setHeader('Content-Type', 'image/png');
				res.send(row[0].tile_data);
			}
			else {
				res.status(404).send('Tile not found');
			}
		}
		catch (e) {
			res.status(500).send("Error: "+e);
		}
	},

};
export default mtMap;