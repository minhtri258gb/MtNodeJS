var mt = {

	isInit: true,

	init: function() {
		try {

			this.event.init();
			this.mgr.init();
			this.sheet.init();
			this.notepad.init();
			this.jzz.init();

			this.isInit = false;

		} catch (e) {
			console.error(e);
		}
	},

	mgr: {

		tracks: [],
		trackCurId: 0, // track hiện tại
		notes: [], // notes của track hiện tại
		ppqn: 96,
		bpm: 90,

		init: function() {

			// Tạo track đầu tiên
			this.tracks.push({
				arrId: 0,
				name: "Track 1",
				chanel: 0,
				program: 16,
				notes: this.notes,
			});
			
			this.c_volume.init();
			this.c_tracks.init();
			this.c_length.init();
			this.c_instruments.init();
			this.c_file.init();
		},

		c_volume: {
			component: null,
			init: function() {
				let c = $('#volume');
				this.component = c;
				c.numberspinner({
					label: 'Volume:',
					labelPosition: 'left',
					spinAlign: 'horizontal',
					value: -8,
					width: 190,
					suffix: " Db",
					onChange: function(newValue,oldValue) {
						// mt.tone.setVolume(newValue); // #TODO
					},
				});
			},
		},
		c_tracks: {
			component: null,
			init: function() {
				let c = $('#tracks');
				this.component = c;
				c.combobox({
					data: mt.mgr.tracks,
					valueField: 'arrId',
					textField: 'name'
				});
			}
		},
		c_length: {
			component: null,
			init: function() {
				let c = $('#length');
				this.component = c;
				c.slider({
					width: 300,
					range: true,
					min: 0,
					max: 1,
					step: 0.01,
					value: [0,1],
					tipFormatter: function(value){
						return value + '%';
					}
				});
			},
		},
		c_instruments: {
			
			h_class: [
				{ text: ' Piano', value: 0, iconCls:'icon-add' },
				{ text: ' Chromatic Percussion', value: 8, iconCls:'icon-add' },
				{ text: ' Organ', value: 16, iconCls:'icon-add' },
				{ text: ' Guitar', value: 24, iconCls:'icon-add' },
				{ text: ' Bass', value: 32, iconCls:'icon-add' },
				{ text: ' Strings', value: 40, iconCls:'icon-add' },
				{ text: ' Ensemble', value: 48, iconCls:'icon-add' },
				{ text: ' Brass', value: 56, iconCls:'icon-add' },
				{ text: ' Reed', value: 64, iconCls:'icon-add' },
				{ text: ' Pipe', value: 72, iconCls:'icon-add' },
				{ text: ' Synth Lead', value: 80, iconCls:'icon-add' },
				{ text: ' Synth Pad', value: 88, iconCls:'icon-add' },
				{ text: ' Synth Effects', value: 96, iconCls:'icon-add' },
				{ text: ' Ethnic', value: 104, iconCls:'icon-add' },
				{ text: ' Percussive', value: 112, iconCls:'icon-add' },
				{ text: ' Sound Effects', value: 120, iconCls:'icon-add' },
			],

			h_type: [
				{ text: '1. Acoustic Grand Piano', value: 0 },
				{ text: '2. Bright Acoustic Piano', value: 1 },
				{ text: '3. Electric Grand Piano', value: 2 },
				{ text: '4. Honky-tonk Piano', value: 3 },
				{ text: '5. Electric Piano 1', value: 4 },
				{ text: '6. Electric Piano 2', value: 5 },
				{ text: '7. Harpsichord', value: 6 },
				{ text: '8. Clavinet', value: 7 },
				{ text: '1. elesta', value: 8 },
				{ text: '2. Glockenspiel', value: 9 },
				{ text: '3. Music Box', value: 10 },
				{ text: '4. Vibraphone', value: 11 },
				{ text: '5. Marimba', value: 12 },
				{ text: '6. Xylophone', value: 13 },
				{ text: '7. Tubular Bells', value: 14 },
				{ text: '8. Dulcimer', value: 15 },
				{ text: '1. Drawbar Organ', value: 16 },
				{ text: '2. Percussive Organ', value: 17 },
				{ text: '3. Rock Organ', value: 18 },
				{ text: '4. Church Organ', value: 19 },
				{ text: '5. Reed Organ', value: 20 },
				{ text: '6. Accordion', value: 21 },
				{ text: '7. Harmonica', value: 22 },
				{ text: '8. Tango Accordion', value: 23 },
				{ text: '1. Acoustic Guitar (nylon)', value: 24 },
				{ text: '2. Acoustic Guitar (steel)', value: 25 },
				{ text: '3. Electric Guitar (jazz)', value: 26 },
				{ text: '4. Electric Guitar (clean)', value: 27 },
				{ text: '5. Electric Guitar (muted)', value: 28 },
				{ text: '6. Overdriven Guitar', value: 29 },
				{ text: '7. Distortion Guitar', value: 30 },
				{ text: '8. Guitar Harmonics', value: 31 },
				{ text: '1. Acoustic Bass', value: 32 },
				{ text: '2. Electric Bass (finger)', value: 33 },
				{ text: '3. Electric Bass (pick)', value: 34 },
				{ text: '4. Fretless Bass', value: 35 },
				{ text: '5. Slap Bass 1', value: 36 },
				{ text: '6. Slap Bass 2', value: 37 },
				{ text: '7. Synth Bass 1', value: 38 },
				{ text: '8. Synth Bass 2', value: 39 },
				{ text: '1. Violin', value: 40 },
				{ text: '2. Viola', value: 41 },
				{ text: '3. Cello', value: 42 },
				{ text: '4. Contrabass', value: 43 },
				{ text: '5. Tremolo Strings', value: 44 },
				{ text: '6. Pizzicato Strings', value: 45 },
				{ text: '7. Orchestral Harp', value: 46 },
				{ text: '8. Timpani', value: 47 },
				{ text: '1. String Ensemble 1', value: 48 },
				{ text: '2. String Ensemble 2', value: 49 },
				{ text: '3. Synth Strings 1', value: 50 },
				{ text: '4. Synth Strings 2', value: 51 },
				{ text: '5. Choir Aahs', value: 52 },
				{ text: '6. Voice Oohs', value: 53 },
				{ text: '7. Synth Choir', value: 54 },
				{ text: '8. Orchestra Hit', value: 55 },
				{ text: '1. Trumpet', value: 56 },
				{ text: '2. Trombone', value: 57 },
				{ text: '3. Tuba', value: 58 },
				{ text: '4. Muted Trumpet', value: 59 },
				{ text: '5. French Horn', value: 60 },
				{ text: '6. Brass Section', value: 61 },
				{ text: '7. Synth Brass 1', value: 62 },
				{ text: '8. Synth Brass 2', value: 63 },
				{ text: '1. Soprano Sax', value: 64 },
				{ text: '2. Alto Sax', value: 65 },
				{ text: '3. Tenor Sax', value: 66 },
				{ text: '4. Baritone Sax', value: 67 },
				{ text: '5. Oboe', value: 68 },
				{ text: '6. English Horn', value: 69 },
				{ text: '7. Bassoon', value: 70 },
				{ text: '8. Clarinet', value: 71 },
				{ text: '1. Piccolo', value: 72 },
				{ text: '2. Flute', value: 73 },
				{ text: '3. Recorder', value: 74 },
				{ text: '4. Pan Flute', value: 75 },
				{ text: '5. Blown Bottle', value: 76 },
				{ text: '6. Shakuhachi', value: 77 },
				{ text: '7. Whistle', value: 78 },
				{ text: '8. Ocarina', value: 79 },
				{ text: '1. square', value: 80 },
				{ text: '2. sawtooth', value: 81 },
				{ text: '3. calliope', value: 82 },
				{ text: '4. chiff', value: 83 },
				{ text: '5. charang', value: 84 },
				{ text: '6. voice', value: 85 },
				{ text: '7. fifths', value: 86 },
				{ text: '8. bass + lead', value: 87 },
				{ text: '1. new age', value: 88 },
				{ text: '2. warm', value: 89 },
				{ text: '3. polysynth', value: 90 },
				{ text: '4. choir', value: 91 },
				{ text: '5. bowed', value: 92 },
				{ text: '6. metallic', value: 93 },
				{ text: '7. halo', value: 94 },
				{ text: '8. sweep', value: 95 },
				{ text: '1. rain', value: 96 },
				{ text: '2. soundtrack', value: 97 },
				{ text: '3. crystal', value: 98 },
				{ text: '4. atmosphere', value: 99 },
				{ text: '5. brightness', value: 100 },
				{ text: '6. goblins', value: 101 },
				{ text: '7. echoes', value: 102 },
				{ text: '8. sci-fi', value: 103 },
				{ text: '1. Sitar', value: 104 },
				{ text: '2. Banjo', value: 105 },
				{ text: '3. Shamisen', value: 106 },
				{ text: '4. Koto', value: 107 },
				{ text: '5. Kalimba', value: 108 },
				{ text: '6. Bagpipe', value: 109 },
				{ text: '7. Fiddle', value: 110 },
				{ text: '8. Shanai', value: 111 },
				{ text: '1. Tinkle Bell', value: 112 },
				{ text: '2. Agogo', value: 113 },
				{ text: '3. Steel Drums', value: 114 },
				{ text: '4. Woodblock', value: 115 },
				{ text: '5. Taiko Drum', value: 116 },
				{ text: '6. Melodic Tom', value: 117 },
				{ text: '7. Synth Drum', value: 118 },
				{ text: '8. Reverse Cymbal', value: 119 },
				{ text: '1. Guitar Fret Noise', value: 120 },
				{ text: '2. Breath Noise', value: 121 },
				{ text: '3. Seashore', value: 122 },
				{ text: '4. Bird Tweet', value: 123 },
				{ text: '5. Telephone Ring', value: 124 },
				{ text: '6. Helicopter', value: 125 },
				{ text: '7. Applause', value: 126 },
				{ text: '8. Gunshot', value: 127 },
			],

			instruments_class: null,
			instruments_type: null,

			init: function() {

				this.instruments_class = $('#instruments_class');
				this.instruments_type = $('#instruments_type');

				this.instruments_type.combobox({
					data: null,
					valueField: 'value', textField: 'text',
					onSelect: (r) => {
						if (!mt.isInit) {
							mt.mgr.tracks[mt.mgr.trackCurId].program = r.value; // Đổi nhạc cụ track hiện tại
							mt.jzz.setInstrument(r.value); // Đổi âm nhạc cụ đầu ra
							mt.jzz.playNote({
								chanel: 0,
								note: 72,
								tick: 1000,
								velocity: 127,
							});
						}
					},
					onClick: (r) => {
					}
				});

				this.instruments_class.combobox({
					value: 16,
					data: this.h_class,
					valueField: 'value', textField: 'text',
					showItemIcon: true,
					label: 'Instrument:', labelPosition: 'top',
					onSelect: (r) => {
						this.instruments_type
							.combobox('loadData', this.h_type.slice(r.value, r.value + 8))
							.combobox('setValue', r.value);
					}
				});
				
			}

		},
		c_file: {
			component: null,
			_smf: null,
			data: [],

			init: function() {
				let self = mt.mgr.c_file;
				let c = $('#filebox');
				this.component = c;
				c.filebox({
					accept: 'audio/mid',
					onChange: () => {
						let files = self.component.filebox("files");
						if (files.length > 0) {
							let file = files[0];
							let reader = new FileReader();
							reader.addEventListener('load', (event) => {
								self._smf = new JZZ.MIDI.SMF(event.target.result);
								self.data = mt.jzz.smf2struct(self._smf);
							});
							reader.readAsArrayBuffer(file);
						}
					}
				});
			},
		},

		onTrackAdd: function() {

			//

		},
		onTrackDel: function() {

		},
		onBPM: function(value) {
			mt.mgr.bpm = value;
		},
		ononPPQN: function(value) {
			mt.mgr.ppqn = value;
		},

	},

	notepad: {
		component: null,
		_btn_notepad_compile: null,
		isCompile: true,

		data: [],

		init: function() {
			this.component = $('#notepad');
			this._btn_notepad_compile = $('#btn_notepad_compile');
		},
		set: function(content) {
			this.component.textbox('setText', content);
		},
		onChange: function(value) {
			let self = mt.notepad;
			
			// Bật nút compile khi thay đổi
			self.isCompile = false;
			self._btn_notepad_compile.linkbutton('enable');

		},
		btnPlay: function() {
			
			// Auto compile
			if (!this.isCompile)
				this.btnCompile();

			let curTrack = mt.mgr.tracks[mt.mgr.trackCurId];

			let smf = mt.jzz.getSMF({
				ppqn: mt.mgr.ppqn,
				bpm: mt.mgr.bpm,
				tracks: [
					{
						name: curTrack.name,
						chanel: curTrack.chanel,
						program: curTrack.program,
						notes: this.data,
					}
				]
			});

			let player = smf.player();
			player.connect(mt.jzz._out);
			player.play();
		},
		btnCompile: function() {
			
			let strRaw = this.component.textbox('getText');
			let strs = strRaw.split('\n');
			let res = [];
			for (let i=0; i<strs.length; i++) {
				let str = strs[i];
				if (str.length == 0 || str[0] == '#')
					continue;
				let params = str.split(' ');
				res.push({
					note: mt.jzz.name2num(params[0]),
					duration: params[1].substring(0, params[1].length-1),
					time: parseFloat(params[2])
				});
			}

			this.data = res;

			// Tránh ấn nhiều lần
			this.isCompile = true;
			this._btn_notepad_compile.linkbutton('disable');

		},
		btnImpSheet: function() {
			let content = "";
			mt.sheet.data.forEach(v => content += "" + mt.jzz.num2name(v.note) + " " + v.duration + "n " + v.time + "\n");
			mt.notepad.set(content);

			// Auto compile
			this.btnCompile();
		},

	},

	sheet: { // giao diện vẽ nhạc

		_canvas: null,
		_ctx: null,
		_imgEmpty: null, // background without note

		notes: [],
		curNote: null,

		data: [],

		_btn_sheet_compile: null,
		isCompile: true,

		config: {
			beatDivide: 4,
			beatCount: 10,
			beatSize: 200,
			noteSize: 12,
			wOffset: 20,
			hOffset: 40,
		},

		init: function() {

			// Component
			this._btn_sheet_compile = $('#btn_sheet_compile');

			// Init Sheet

			this._canvas = document.getElementById("sheet");
			let canvas = this._canvas;

			canvas.addEventListener('click', mt.sheet.click);
			canvas.addEventListener('mousemove', mt.sheet.mousemove);

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
					mt.sheet._imgEmpty = image;
			});

		},

		_emptyBackbround: null,
		drawBackground: function() {

		},

		click: function(e) {

			let self = mt.sheet;
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
			let index = self.find(midi, time);
			if (index < 0) {

				// Add midi
				self.add(midi, config.beatDivide, time, 127);

				// Render midi
				ctx.fillStyle = "#6495ed";
				ctx.fillRect(xo, yo, xs, ys);

				// Play node
				mt.jzz.playNote({
					chanel: 0,
					note: midi,
					tick: 500,
					velocity: 127,
				});

			} else {

				// Delete midi
				self.del(midi, index);

				// Render clean midi
				ctx.drawImage(self._imgEmpty, xo, yo, xs, ys, xo, yo, xs, ys);

			}

			// Bật nút compile khi thay đổi
			self.isCompile = false;
			self._btn_sheet_compile.linkbutton('enable');

		},

		mousemove: function(e) {
			// let ctx = mt.sheet._ctx;
			// ctx.beginPath();
			// ctx.lineWidth = 1;
			// ctx.strokeStyle = "#f00";

			// ctx.moveTo(e.layerX, e.layerY-50); // layerX
			// ctx.lineTo(e.layerX, e.layerY+50);

			// ctx.moveTo(e.layerX-50, e.layerY);
			// ctx.lineTo(e.layerX+50, e.layerY);

			// ctx.stroke();
		},

		btnCompile: function() {
			
			// Get list note from sheet
			let listNote = [];
			for (const noteid in this.notes) {
				listNote = listNote.concat(this.notes[noteid]);
			}
			listNote.sort((a,b) => {
				if (a.time == b.time) {
					return a.note - b.note;
				}
				return a.time - b.time;
			});

			this.data = listNote;

			// Tránh ấn nhiều lần
			this.isCompile = true;
			this._btn_sheet_compile.linkbutton('disable');

		},
		btnPlay: function() {

			// Auto compile
			if (!this.isCompile)
				this.btnCompile();

			let curTrack = mt.mgr.tracks[mt.mgr.trackCurId];

			let smf = mt.jzz.getSMF({
				ppqn: mt.mgr.ppqn,
				bpm: mt.mgr.bpm,
				tracks: [
					{
						name: curTrack.name,
						chanel: curTrack.chanel,
						program: curTrack.program,
						notes: this.data,
					}
				]
			});

			let player = smf.player();
			player.connect(mt.jzz._out);
			player.play();

		},

		reset: function() {
			this._ctx.drawImage(this._imgEmpty, 0, 0);
			this.notes = [];
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
		},

	},

	handler: {

		removeNote: function() {
			let mgr = mt.mgr;
			if (mgr.curNote != null) {
				
				
				
				mgr.curNote = null;
			}
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

	jzz: {
		_out: null,
		_h_cov: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
		init: function() {
			JZZ.synth.Tiny.register();
			this._out = JZZ().or('Cannot start MIDI engine!').openMidiOut().or('Cannot open MIDI port!');
			this.setVolume(0.4); // volume
		},
		setVolume: function(value, chanel = 0) {
			this._out.volumeF(chanel, value);
		},
		playNote: async function(note) {
			/* Example
			this.playNote({
				chanel: 0,
				note: 72,
				tick: 500,
				velocity: 127,
			});
			*/
			await this._out.note(note.chanel, note.note, note.velocity, note.tick);
		},
		name2num: function(name) {
			if (!name.length || name.length < 2)
				throw('[mt.jzz.num2name] input not midi name');
			let level = parseInt(name.substring(name.length-1)) + 1;
			if (isNaN(level) || level < 0 || level > 9)
				throw('[mt.jzz.num2name] input not midi name');
			let baseCode = name.substring(0, name.length-1);
			let baseNum = undefined;
			for (let i=0; i<12; i++) {
				if (this._h_cov[i] == baseCode) {
					baseNum = i;
					break;
				}
			}
			if (baseNum == undefined)
				throw('[mt.jzz.num2name] input not midi name');
			return level * 12 + baseNum;
		},
		num2name: function(num) {
			if (typeof num != 'number' || num < 21 || num > 108)
				throw('[mt.jzz.num2name] input not number');
			return this._h_cov[num % 12] + (Math.floor(num / 12) - 1);
		},
		checkSharp: function(num) {
			let v = num % 12;
			return (v==1 || v==3 || v==6 || v==8 || v==10);
		},
		getSMF: function(midiData) {

			// Create SMF
			let smf = new JZZ.MIDI.SMF(1, midiData.ppqn);

			// Add track
			for (let iTrk=0; iTrk<midiData.tracks.length; iTrk++) {
				let trkData = midiData.tracks[iTrk];
				let trk = new JZZ.MIDI.SMF.MTrk();
				smf.push(trk);
				let ref = trk.smfSeqName(trkData.name)
					.smfBPM(midiData.bpm)
					.ch(trkData.chanel)
					.program(trkData.program);

				let curtime = 0;
				for (let iNote=0; iNote<trkData.notes.length; iNote++) {
					let noteData = trkData.notes[iNote];

					// Add tick
					let deltaTime = noteData.time - curtime;
					curtime = noteData.time;
					ref = ref.tick(midiData.ppqn * deltaTime);

					// Add note
					ref = ref.note(noteData.note, noteData.velocity ? noteData.velocity : 127, midiData.ppqn / noteData.duration);
				}

				// Add end track
				if (trkData.notes.length > 0) {
					let lastDuration = trkData.notes[trkData.notes.length-1].duration;
					let lastTick = curtime * midiData.ppqn + midiData.ppqn / lastDuration;
					ref = ref.tick(lastTick).smfEndOfTrack();
				}
			}

			return smf;
		},
		setInstrument: function(num) { // 0 - 127
			this._out.program(0, num);
		},
		smf2struct: function(smf) {

			if (smf == undefined || smf == null)
				throw("[mt.jzz.smf2struct] smf invaild");

			let structData = {};
			structData.ppqn = smf.ppqn;
			structData.factor = 1.0;
			structData.tracks = [];
			
			for (let mTrkId=0; mTrkId<smf.ntrk; mTrkId++) {
				let mTrk = smf.at(mTrkId);

				// Thêm vào struct
				let trkStruct = {
					name: "track "+mTrkId,
					chanel: 0,
					program: 0,
					notes: []
				};
				structData.tracks.push(trkStruct);

				for (let i=0; i<mTrk.length; i++) {
					let n = mTrk[i];

					if (n.isNoteOn()) {
						let note = n.getNote();
						let time = n.tt;
						let duration = 0;
						let velocity = n.getVelocity();

						// Tìm end của note này
						for (let j=i+1; j<mTrk.length; j++) {
							let ne = mTrk[j];
							if (ne.isNoteOff() && ne.getNote() == note) {
								duration = ne.tt - n.tt;
								break;
							}
						}
						if (duration == 0)
							throw("[mt.jzz.loadFromFile] MIDI có note ko tìm được duration");

						// Lưu note
						trkStruct.notes.push({
							note: note,
							time: time / structData.ppqn,
							duration: duration / structData.ppqn,
							velocity: velocity
						});
					} else if (structData.bpm == undefined) {
						structData.bpm = n.getBPM();
					}
				}
			}

			if (structData.ppqn > 0 && structData.bpm > 0)
				structData.factor = 60000.0 / (structData.ppqn * structData.bpm);

			return structData;
		},
		f1: function() {
			
		},
		f2: function(midiData) {

		},
		f3: function() {

			let self = this;

			let files = $('#filebox').filebox('files');
			if (files.length > 0) {
				var reader = new FileReader();
				reader.onload = function(e) {
					var smf2 = new JZZ.MIDI.SMF(e.target.result);
					console.log(smf2)

					// let player = smf2.player();
					// player.connect(self._out);
					// player.play();

				};
				reader.onerror = function(e) {
					console.log('Error : ' + e.type);
				};
				reader.readAsBinaryString(files[0]);
			}

		},
	},

	utils: {
		download: function(filename, data) { // arraybuffer
			// Exam: mt.utils.download("midi.mid", smf.toArrayBuffer());
			// base64 to dump: atob(data)
			const a = document.createElement('a');
			a.style.display = 'none';
			document.body.appendChild(a);
			const blob = new Blob([data], {type: "octet/stream"});
			const url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		},
	},

};