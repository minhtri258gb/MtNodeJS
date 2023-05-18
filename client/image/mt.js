var mt = {

	image: null,

	gui: {

		layout: null,
		
	},

	content: {
		width: 0,
		height: 0,
		minWidth: 0,
		minHeight: 0,

		init: function() {

			this.minWidth = document.documentElement.clientWidth - 256 - 5; // subtract left, border
			this.minHeight = document.documentElement.clientHeight - 32 - 5; // subtract title, border

			this.width = this.minWidth;
			this.height = this.minHeight;
			
			this.svg = SVG().addTo('#content').size(this.width, this.height);
		},
		
		load: function(src) {
			if (!src.type.match(/image.*/)) {
				alert("The dropped file is not an image: " + src.type);
				return;
			}
		
			let reader = new FileReader();
			reader.onload = (e) => {
				this.render(e.target.result);
			};
			reader.readAsDataURL(src);
		},

		render: function(src) {

			// Render image
			this.svg.image(src)
				.id('img')
				.stroke({ color: '#f06', opacity: 1, width: 5 });
			this.interact('img');
			
			// Save
			Jimp.read({
				url: src,
			}).then((image) => {
				mt.image = image;
				mt.content.resize();
			}).catch((error) => {
				console.log(`Error loading image -> ${error}`);
			});
		},

		getData: function() {
			return document.getElementById(this.id).toDataURL();
			// return encodeURIComponent(document.getElementById(this.id).toDataURL("image/png"));
		},

		resize: function() {
			let self = mt.content;

			self.minWidth = document.documentElement.clientWidth - 256 - 5; // subtract left, border
			self.minHeight = document.documentElement.clientHeight - 32 - 5; // subtract title, border

			let width = 0, height = 0;
			if (mt.image != null) {
				width = mt.image.bitmap.width;
				height = mt.image.bitmap.height;
			}
			width = Math.max(self.minWidth, width);
			height = Math.max(self.minHeight, height);
			
			if (width != self.width || height != self.height) {
				self.width = width;
				self.height = height;
				self.svg.size(width, height);
			}
		},

		interact: function(idElement) {
			interact('#'+idElement)

			.resizable({
				edges: { left: true, right: true, bottom: true, top: true },
				listeners: {
					move (event) {
						var target = event.target
						var x = (parseFloat(target.getAttribute('data-x')) || 0)
						var y = (parseFloat(target.getAttribute('data-y')) || 0)

						// update the element's style
						target.style.width = event.rect.width + 'px'
						target.style.height = event.rect.height + 'px'

						// translate when resizing from top or left edges
						x += event.deltaRect.left
						y += event.deltaRect.top

						target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

						target.setAttribute('data-x', x)
						target.setAttribute('data-y', y)
						target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
					}
				},
				modifiers: [
					// keep the edges inside the parent
					interact.modifiers.restrictEdges({
						outer: 'parent'
					}),

					// minimum size
					interact.modifiers.restrictSize({
						min: { width: 100, height: 50 }
					})
				],

				inertia: true
			})

			.draggable({
				listeners: { move: window.dragMoveListener },
				inertia: true,
				modifiers: [
					interact.modifiers.restrictRect({
						restriction: 'parent',
						endOnly: true
					})
				]
			});

			function dragMoveListener (event) {
				var target = event.target
				// keep the dragged position in the data-x/data-y attributes
				var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
				var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
			  
				// translate the element
				target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
			  
				// update the posiion attributes
				target.setAttribute('data-x', x)
				target.setAttribute('data-y', y)
			  }
			  
			  // this function is used later in the resizing and gesture demos
			  window.dragMoveListener = dragMoveListener
		}
	},

	c_process: {

		click: function(event) {

		}
	},

	file: {
		component: null,

		init: function() {
			let c = $('#file');
			this.component = c;
			c.on('dragover', function(e) {
				e.preventDefault();
				// this.off('dragover');
			});
			c.on('drop', function(e) {
				e.preventDefault();
				mt.content.load(e.originalEvent.dataTransfer.files[0]);
			});
		}
	},

	init: function() {

		// Component
		this.content.init();
		this.file.init();
		this.event.init();
		
	},

	event: {

		init: function() {
			document.addEventListener('copy', this.copy);
			window.addEventListener('resize', this.resize);

			


			document.onpaste = (event) => {
				const items = (event.clipboardData || event.originalEvent.clipboardData).items;
				console.log(JSON.stringify(items));
				let blob = null;
				for (let i = 0; i < items.length; i++) {
					if (items[i].type.indexOf("image") === 0) {
						blob = items[i].getAsFile();
					}
				}
			  
				if (blob !== null) {
					const reader = new FileReader();
					reader.onload = (event) =>{
						console.log(event.target.result); 
					};
					reader.readAsDataURL(blob);
				}
			};
		},

		copy: function(e) {
			let data = mt.image.getBase64(Jimp.MIME_PNG, (err) => { console.log(err) });
			e.clipboardData.setData(Jimp.MIME_PNG, data);
			e.preventDefault();
		},

		paste: function(e) {
			
		},

		resize: function() {
			mt.content.resize();
		}
	},

	test: function() {
		
		Jimp.read(mt.c_canvas.getData())
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
