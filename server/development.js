
try {
	let mt = require('./mt');
	mt.config.debug = true;
	mt.init();
} catch (e) {
	console.log(e);
}
