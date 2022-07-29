var app = {
	init: function() {

		// Component
		this.c_canvas.init();
		this.event.init();
		
	},
	c_canvas: {
		id: "canvas",
		h_max_height: 100,
		init: function() {
			let c = document.getElementById(this.id);
			c.addEventListener("dragover", function(e) { e.preventDefault(); }, true);
			c.addEventListener("drop", function(e) { e.preventDefault(); app.c_canvas.loadImage(e.dataTransfer.files[0]); }, true);
		},
		loadImage: function(src) {
			if (!src.type.match(/image.*/)) {
				alert("The dropped file is not an image: " + src.type);
				return;
			}
		
			let reader = new FileReader();
			reader.onload = function(e) {
				app.c_canvas.render(e.target.result);
			};
			reader.readAsDataURL(src);
		},
		render: function(src) {
			let image = new Image();
			image.onload = function() {
				let canvas = document.getElementById(app.c_canvas.id);
				// if(image.height > MAX_HEIGHT) {
				// 	image.width *= MAX_HEIGHT / image.height;
				// 	image.height = MAX_HEIGHT;
				// }
				let ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = image.width;
				canvas.height = image.height;
				ctx.drawImage(image, 0, 0, image.width, image.height);
			};
			image.src = src;
		},
		getData: function() {
			return document.getElementById(this.id).toDataURL();
			// return encodeURIComponent(document.getElementById(this.id).toDataURL("image/png"));
		}
	},
	event: {
		init: function() {
			document.addEventListener('copy', app.event.copy);
		},
		copy: function(e) {
			e.clipboardData.setData("image/png", app.c_canvas.getData());
			e.preventDefault();
		}
	},
	test: function() {
		
		Jimp.read(app.c_canvas.getData())
			.then(image => {
				debugger
			})
			.catch(err => {
				debugger
			});

		return;


		//draw the image on first load
		cropImage(imagePath, 0, 0, 200, 200);


		//crop the image and draw it to the canvas
		function cropImage(imagePath, newX, newY, newWidth, newHeight) {
			//create an image object from the path
			const originalImage = new Image();
			originalImage.src = imagePath;
		
			//initialize the canvas object
			const canvas = document.getElementById('canvas'); 
			const ctx = canvas.getContext('2d');
		
			//wait for the image to finish loading
			originalImage.addEventListener('load', function() {
		
				//set the canvas size to the new width and height
				canvas.width = newWidth;
				canvas.height = newHeight;
				
				//draw the image
				ctx.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight); 
			});
		}

		//find the input elements in the html
		const downloadBtn = document.querySelector("button.download");

		//bind a click listener to the download button
		downloadBtn.addEventListener('click', function() {
			//create a temporary link for the download item
			let tempLink = document.createElement('a');
		
			//generate a new filename
			let fileName = `image-cropped.jpg`;
			
			//configure the link to download the resized image
			tempLink.download = fileName;
			tempLink.href = document.getElementById('canvas').toDataURL("image/jpeg", 0.9);
		
			//trigger a click on the link to start the download
			tempLink.click();
		});









	},
	upload: function() {

		let files = $('#file').filebox('files');

		function ajaxHandler() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.response);
				console.log(response.filename + ' uploaded');
				appendThumbnail( files[response.index] );
			} else {
				// Uncomment if you want to display the states other than above.
				// console.log('State: ' + this.readyState + ', ' + this.statusText); 
			}
		}

		for (var i=0, f; f=files[i]; i++) {

			// Only process image files.
			if ( !f.type.match('image.*') ) continue;
			
			// Create form data containing a file to be uploaded.
			var formData = new FormData();
			formData.append("index", i);
			formData.append("image", f);
	
			// Ajax event: Upload files to the server.
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = ajaxHandler;
			// xhr.onprogress = progressHandler;
			xhr.open('PUT', '/imageHandler/upload', true);
			xhr.send(formData);
	
		} // END for

	}
};
