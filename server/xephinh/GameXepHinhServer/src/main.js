



var http = require('http');

try
{
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World!');
	}).listen(8080);
}
catch (e)
{
	console.log(e.Message);
}