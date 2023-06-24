
window.onload = function() {
	
	let numPart = 8;

	let lstImg = $('#lstImg');
	lstImg.html('');

	for (let i=0; i<numPart; i++) {
		lstImg.append('<img id="scream" hidden src="./image/img'+i+'.jpg" alt="The Scream"></img>');
	}

	// setting
	var canvas = document.getElementById("canvas");
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log("canvas 1");
	console.log(canvas);

	// Thu vien
	canvas = new Fabric.Canvas("canvas");
	console.log("canvas 2");
	console.log(canvas);


	// var c = document.getElementById("myCanvas");
	// var ctx = c.getContext("2d");
	// var img = document.getElementById("scream");
	// ctx.drawImage(img, 10, 10);
};



