var MtAuthorize = function(req) {
	// let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	// return (ip == '::1');

	// console.log("==============================================================");
	// console.log(req.headers);
	// console.log("==============================================================");
	// console.log(req.connection);
	// console.log("==============================================================");
	// return req.headers.host == 'localhost';

	// console.log(req.headers );
	// console.log("req.headers.origin "+req.headers.origin );
	// console.log("req.connection.remoteAddress "+req.connection.remoteAddress );
	// return req.headers.origin == 'http://localhost';

	return true;
};
export default MtAuthorize;