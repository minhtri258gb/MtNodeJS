module.exports =
{
	app: null,

	init: () =>
	{
		const path = require("path");
		const express = require('express');
		this.app = express();
		
		// Middlewares
		this.app.use(express.static(path.join(__dirname, '/public')));
		
		// Routes
		this.app.get("/", (req, res) =>
		{
			// res.send("OKE");
			res.sendFile(path.join(__dirname + '/view/chat.html'));
			// res.sendFile(path.join(__dirname + '/public/chat/chat.html'));
		});
		
		this.app.get("/image", (req, res) =>
		{
			var imageHandler = require('./imageHandler.js');
			imageHandler.sliceImage('public/image/image.png', 9, 30);
			res.sendFile(path.join(__dirname + '/result.jpg'));
		});
		
		this.app.get("/piano", (req, res) =>
		{
			let link = path.join(__dirname + '/public/mini/piano.html');
			res.sendFile(link);
		});
		
		this.app.get("/test", (req, res) =>
		{
			res.send("OKE");
		});
	}
};
