const math = require("mathjs");
const Jimp = require('jimp');

module.exports = {
	split: function(filepath, numPart) {
		Jimp.read(filepath).then(image => {

			let width = image.bitmap.width;
			let height = image.bitmap.height;

			for (let i=0; i<numPart; i++) {
				for (let j=0; j<numPart; j++) {

					let x = math.round(width/numPart*i);
					let w = math.round(width/numPart*(i+1)) - x;
					let y = math.round(height/numPart*j);
					let h = math.round(height/numPart*(j+1)) - y;

					let imgPart = image.clone();
					imgPart.crop(x, y, w, h);

					imgPart.write("./public/image/img"+(i*numPart+j)+".jpg");
				}
			}
		});
	},
};
