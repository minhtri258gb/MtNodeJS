
var mt = {

	init: function() {
		try {

			this.event.init();
			this.canvas.init();
			this.tone.init();
			this.mgr.init();

		} catch (e) {
			console.log(e);
		}
	},

	handler: {

		removeNote: function() {
			let mgr = mt.mgr;
			if (mgr.curNote != null) {
				
				
				
				mgr.curNote = null;
			}
		}

	},

	mgr: {

		tracks: [],
		notes: [],

		curNote: null,


		init: function() {

		},

		find: function(note, time) {

			let lst = this.notes[note];
			if (lst != undefined) {
				for (let i in lst) {
					if (lst[i].time == time)
						return i;
				}
			}

			return -1;
		},

		add: function(note, duration, time, velocity) {

			let lst = this.notes[note];
			if (lst == undefined) {
				lst = [];
				this.notes[note] = lst;
			}

			lst.push({
				note: note,
				duration: duration,
				time: time,
				velocity: velocity
			});
		},

		del: function(note, indexTime) {
			this.notes[note].splice(indexTime, 1);
		}

	},

	event: {

		init: function() {
			document.onkeydown = this.keyDown;
			document.onkeyup = this.keyUp;
		},

		keyDown: function(e) {
			var e = window.event || e;
			let keyCode = e.keyCode;

			if (keyCode == 8) mt.handler.removeNote();
		},

		keyUp: function(e) {
			var e = window.event || e;
			let keyCode = e.keyCode;


		}

	},

	canvas: {

		_canvas: null,
		_ctx: null,
		_imgEmpty: null, // background without note

		config: {
			beatDivide: 4,
			beatCount: 10,
			beatSize: 200,
			noteSize: 12,
			wOffset: 20,
			hOffset: 40,
		},

		init: function() {

			this._canvas = document.getElementById("canvas");
			let canvas = this._canvas;

			canvas.addEventListener('click', mt.canvas.click);
			canvas.addEventListener('mousemove', mt.canvas.mousemove);

			this._ctx = canvas.getContext("2d");
			let ctx = this._ctx;

			let width = this.config.beatCount * this.config.beatSize + this.config.wOffset;
			let height = 36 * this.config.noteSize + this.config.hOffset;

			// C0 - C9
			canvas.width = width + 10;
			canvas.height = height + 10;

			// RENDER

			// Background
			ctx.fillStyle = "#f0f0f0";
			ctx.fillRect(0, 0, width + 10, height + 10);

			// Background #
			ctx.fillStyle = "#cfcfcf";
			// # TODO

			// Caro H
			ctx.beginPath();
			ctx.lineWidth = 1;
			for (let i=0; i<=36; i++) {
				let h = i * this.config.noteSize + this.config.hOffset;
				ctx.moveTo(this.config.wOffset, h);
				ctx.lineTo(width + 10, h);
			}
			ctx.stroke();

			// Caro V - Strong beat
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#000";
			for (let i=0; i<=this.config.beatCount; i++) {
				// Strong beat
				let w = i * this.config.beatSize + this.config.wOffset;
				ctx.moveTo(w, this.config.hOffset-20);
				ctx.lineTo(w, height);
			}
			ctx.stroke();

			// Caro V - Weak beat
			let beat_size_small = this.config.beatSize / this.config.beatDivide;
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#444";
			for (let i=0; i<this.config.beatCount; i++) {
				let w = i * this.config.beatSize + this.config.wOffset;
				for (let j=1; j<this.config.beatDivide; j++) {
					w += beat_size_small;
					ctx.moveTo(w, this.config.hOffset);
					ctx.lineTo(w, height);
				}
			}
			ctx.stroke();

			// Save Image
			createImageBitmap(
				ctx.getImageData(0, 0, canvas.width, canvas.height),
				0, 0, canvas.width, canvas.height).then((image) => {
					mt.canvas._imgEmpty = image;
			});

		},

		_emptyBackbround: null,
		drawBackground: function() {

		},

		click: function(e) {

			let self = mt.canvas;
			let config = self.config;
			let ctx = self._ctx;

			let x = (e.offsetX + 1 - config.wOffset) / config.beatSize;
			let y = (e.offsetY + 1 - config.hOffset) / config.noteSize;

			let beat = parseInt(x);
			let note = 36 - parseInt(y);
			let midi = note - 1 + 60; // C4

			let beatWeak = parseInt((x - beat) * config.beatDivide);
			let beatWeakSize = config.beatSize / config.beatDivide;
			let offsetBeatWeak = beatWeak * beatWeakSize;

			let time = beat + beatWeak / config.beatDivide;

			let xo = (beat       * config.beatSize + config.wOffset + offsetBeatWeak)	+ 1;
			let yo = ((36-note) * config.noteSize + config.hOffset)					+ 1;
			let xs = (beatWeakSize)		- 2;
			let ys = (config.noteSize)	- 2;


			// Kiem tra co midi chua
			let index = mt.mgr.find(midi, time);
			if (index < 0) {

				// Add midi
				mt.mgr.add(midi, config.beatDivide, time, undefined);

				// Render midi
				ctx.fillStyle = "#6495ed";
				ctx.fillRect(xo, yo, xs, ys);

				// Play node
				mt.tone.playNote(midi);

			} else {

				// Delete midi
				mt.mgr.del(midi, index);

				// Render clean midi
				ctx.drawImage(self._imgEmpty, xo, yo, xs, ys, xo, yo, xs, ys);

			}

		},

		mousemove: function(e) {
			// let ctx = mt.canvas._ctx;
			// ctx.beginPath();
			// ctx.lineWidth = 1;
			// ctx.strokeStyle = "#f00";

			// ctx.moveTo(e.layerX, e.layerY-50); // layerX
			// ctx.lineTo(e.layerX, e.layerY+50);

			// ctx.moveTo(e.layerX-50, e.layerY);
			// ctx.lineTo(e.layerX+50, e.layerY);

			// ctx.stroke();
		}

	},

	tone: {

		_synth: null,

		init: function() {
			this._synth = new Tone.Synth().toDestination();

			// const now = Tone.now(); // just decimal
			// this._synth.triggerAttackRelease(Tone.Frequency(48, "midi"), "8n", now);
			// this._synth.triggerAttackRelease(Tone.Frequency(52, "midi"), "8n", now + 0.5);
			// this._synth.triggerAttackRelease(Tone.Frequency(55, "midi"), "8n", now + 1);
		},

		// note (1 - 120), duration (1, 2, 4, 8, ...)
		playNote: function(note, duration = 8, time, velocity) {
			this._synth.triggerAttackRelease(
				Tone.Frequency(note, "midi"),
				duration + "n",
				time,
				velocity
			);
		}

	},

	utils: {

	}

};