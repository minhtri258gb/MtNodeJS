import mt from './mt.js';

try {
	mt.config.debug = true;
	mt.init();
}
catch (e) {
	console.log(e);
}
