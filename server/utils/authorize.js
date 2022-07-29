module.exports = function(req) {
	let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	return (ip == '::1');
};
