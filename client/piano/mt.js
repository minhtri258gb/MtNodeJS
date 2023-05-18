/**
 * xanh dam		3859F7
 * xanh lat		85C6FF
 * tim dam		3211CC
 * tim lat		7E5DFF
**/

var mt = {

	keyMap: {},
	midi: {
		file: null,
		player: null,
		ppqn: 0,
		BPM: 0,
		notes: [],
		factor: 1.0, // clock to milisecond

		loadFromFake: function() {
			this.data = [
				{time:0, note:64, velocity:80, duration:500},
				{time:0, note:65, velocity:80, duration:1000},
				{time:0, note:66, velocity:80, duration:1500},
				{time:0, note:67, velocity:80, duration:2000},
			];
			mt.screen.note.prepare();
		},

		loadFromFile: function(file) {

			if (file == undefined || file == null)
				return;
			
			this.file = file;
			this.player = file.player();

			this.notes = [];
			this.ppqn = this.file.ppqn;
			this.BPM = undefined;

			for (let mTrkId=0; mTrkId<this.file.ntrk; mTrkId++) {
				let mTrk = this.file.at(mTrkId);
				for (let i=0; i<mTrk.length; i++) {
					let n = mTrk[i];

					if (n.isNoteOn()) {
						let time = n.tt;
						let note = n.getNote();
						let velocity = n.getVelocity();
						let duration = 0;

						// Tìm end của note này
						for (let j=i+1; j<mTrk.length; j++) {
							let ne = mTrk[j];
							if (ne.isNoteOff() && ne.getNote() == note) {
								duration = ne.tt - n.tt;
								break;
							}
						}
						if (duration == 0)
							alert("MIDI có note ko tìm được duration");

						// Lưu note
						this.notes.push({
							time: time,
							note: note,
							velocity: velocity,
							duration: duration
						});
					} else if (this.BPM == undefined) {
						this.BPM = n.getBPM();
					}
				}
			}

			if (this.ppqn > 0 && this.BPM > 0)
				this.factor = 60000.0 / (this.ppqn * this.BPM);
			else
				this.factor = 1.0;

			mt.screen.note.prepare();
		},

		loadFromDesign: function() {
			
			this.data = [
				{note:50, time: 0,   duration:2000},
				{note:80, time: 500, duration:500 }
			];

			mt.screen.note.prepare();
		}

	},

	init: function() {

		// Init UI
		this.tool.bind.init();
		this.tool.offsetNote.init();
		this.tool.file.init();

		this.screen.init();
		this.jzz.init();
		this.key.init();
		this.event.init();
		
		this.tool.instrument.init(); // after jzz

		this.tool.bind.bindKeyBoard(true);
	},

	// Component
	tool: {
		bind: {
			component: null,
			isHookKeyBoard: false,
			init: function() {
				this.component = $('#bind');
			},
			click: function() {
				this.bindKeyBoard(!this.isHookKeyBoard);
			},
			bindKeyBoard: function(toogle) {
				this.isHookKeyBoard = toogle;
	
				if (toogle) {
					document.onkeydown = mt.key.keyDown;
					document.onkeyup = mt.key.keyUp;
					this.component.linkbutton({ iconCls:'icon-bind' });
				} else {
					document.onkeydown = undefined;
					document.onkeyup = undefined;
					this.component.linkbutton({ iconCls:'icon-power' });
				}
			}
		},

		offsetNote: {
			component: null,
			init: function() {
				this.component = $('#offset_note');
			},
			get: function() {
				return parseInt(this.component.numberspinner('getValue'));
			}
		},

		file: {
			component: null,
			init: function() {
				let c = $('#file');
				this.component = c;
				c.filebox({
					accept: 'audio/mid',
					onChange: this.onChange
				});
			},
			// get: function() {
			// 	return this.component.filebox("files");
			// },
			onChange: function() {
				let self = mt.tool.file;
				let files = self.component.filebox("files");
				if (files.length > 0) {
					let file = files[0];
					let reader = new FileReader();
					reader.addEventListener('load', self.loadDone);
					reader.readAsArrayBuffer(file);
				}
			},
			loadDone: function(event) {
				let data = event.target.result;
				mt.midi.loadFromFile(new JZZ.MIDI.SMF(data));
			}
		},

		play: {

			click: function() {

				// Start animation
				if (mt.midi.notes.length == 0)
					mt.midi.loadFromFake();
				mt.screen.note.start();
				
				// Play music
				setTimeout(() => {
					let player = mt.midi.player;
					// player.onEnd = function() { alert('Done!'); };
					player.connect(mt.jzz.out);
					player.play();
				}, mt.screen.note.rulerTime);
			}
		},

		download: {

			click: function() {
				this.download();
			},

			download: function() {

				if (mt.tool.file.midi == null)
					return;

				let filename = mt.tool.file.get()[0].name;
				let str = mt.tool.file.midi.dump();
				let b64 = JZZ.lib.toBase64(str);

				let a = document.createElement('a');
				a.href = 'data:audio/midi;base64,' + b64;
				a.download = filename;
				a.style.display = 'none';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		},

		switch: {
			
			chance: function(checked) {
				mt.screen.design.show(checked);
				mt.screen.note.show(!checked);

				if (!checked)
					mt.screen.note.takeDataFromDesign();
			}
		},

		test: function() {
			// Create a MIDI file. Type 1; 100 clocks per quarter note.
			// Normally, it would rather be 96, but 100 makes it easier to count.
			let smf = new JZZ.MIDI.SMF(1, 100);

			// Add MIDI file tracks:
			let trk0 = new JZZ.MIDI.SMF.MTrk();
			smf.push(trk0);
			trk0.smfSeqName('Little Lame') // The name of the first track serves as the file title
				.smfBPM(90) // Tempo. Normally set at clock 0, but can be also changed later
				.ch(0) // all subsequent messahes will go to channel 0
				.program(0x0b) // set channel 0 program to vibraphone
				.tick(100).note('E5', 127, 75) // clock: 100, MIDI channel: 0, note: E5, velocity: 127, duration: 50 clocks
				.tick(75).note('D5', 127, 25)  // etc...
				.tick(25).note('C5', 127, 50)
				.tick(50).note('D5', 127, 50)
				.tick(50).note('E5',127, 50)
				.tick(50).note(64, 127, 50)   // can also use numerical values for the notes
				.tick(50).note(0x40, 127, 90)
				.tick(100).note('D5', 127, 50)
				.tick(50).note('D5', 127, 50)
				.tick(50).note('D5', 127, 90)
				.tick(100).note('E5', 127, 50)
				.tick(50).note('G5', 127, 50)
				.tick(50).note('G5', 127, 90)
				.tick(100).note('E5', 127, 75)
				.tick(75).note('D5', 127, 25)
				.tick(25).note('C5', 127, 50)
				.tick(50).note('D5', 127, 50)
				.tick(50).note('E5', 127, 50)
				.tick(50).note('E5', 127, 50)
				.tick(50).note('E5', 127, 50)
				.tick(75).note('E5', 127, 25)
				.tick(25).note('D5', 127, 50)
				.tick(50).note('D5', 127, 50)
				.tick(50).note('E5', 127, 50)
				.tick(50).note('D5', 127, 50)
				.tick(50).note('C5', 127, 190)
				.tick(100).note('E5', 100, 90).note('G5', 100, 90).note('C6', 127, 90)
				.tick(100).smfEndOfTrack(); // otherwise it will end on clock 1690

			var str = smf.dump(); // MIDI file dumped as a string
			var b64 = JZZ.lib.toBase64(str); // convert to base-64 string
			var uri = 'data:audio/midi;base64,' + b64; // data URI

			// Finally, write it to the document as a link and as an embedded object:
			document.getElementById('out').innerHTML = 'New file: <a download=lame.mid href=' + uri + '>DOWNLOAD</a>';
		},

		instrument: {

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
						mt.jzz.setInstrument(r.value);
					},
					onClick: (r) => {
						mt.jzz.send(72, true);
						setTimeout(() => {
							mt.jzz.send(72, false);
						}, 1000);
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

		}
	},

	screen: {
		svg: null,
		width: 0,
		height: 0,

		init: function() {

			let width = document.documentElement.clientWidth - 256; // subtract left
			let height = document.documentElement.clientHeight - 32; // subtract title

			// Clamp ratio 4:3
			let tmpW = width/4, tmpH = height/3;
			if (tmpW <= tmpH) height = tmpW * 3;
			else width = tmpH * 4;

			// save
			this.width = width;
			this.height = height;

			// // Clean old svg
			// let c = $('#svg');
			// c.html('');

			// // Style for div svg
			// c.css({ 'width':width+10, 'height':height, 'margin':'auto' });

			// // Caculator
			// let svg = SVG().addTo('#svg').size(width+10, height); // .viewbox('0 0 800 600')
			// this.svg = svg;

			
			this.piano.init();
			// this.design.draw();
			// this.ruler.draw();
			this.note.init();

			// // Default screen
			// this.design.show(false);
			// this.note.show(true);
		},

		piano: {
			svg: null,
			width: 0,
			height: 0,

			init: function() {

				this.width = mt.screen.width;
				this.height = this.width / 10.5;
				
				$('#piano').css({ 'width':this.width, 'height':this.height, 'margin':'auto' });
				this.svg = SVG().addTo('#piano').size('100%', '100%');

				// Style
				let stroke = { color: '#000000', width: 1 };
				let white = { fill:'#ffffff' };

				let scale = this.width / (420 * 5);
				let transW = 420 * scale;

				let ev = ['mousedown', 'mouseup', 'mouseout'];
				let fp = this.press;

				for (let i=0; i<5; i++) {
					let gKey = this.svg.group();
		
					let n = 36 + (i * 12);
					gKey.rect(60,200).move(0  ,0).on(ev,fp).id('k'+(n+ 0)).data('note',n+ 0).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(60 ,0).on(ev,fp).id('k'+(n+ 2)).data('note',n+ 2).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(120,0).on(ev,fp).id('k'+(n+ 4)).data('note',n+ 4).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(180,0).on(ev,fp).id('k'+(n+ 5)).data('note',n+ 5).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(240,0).on(ev,fp).id('k'+(n+ 7)).data('note',n+ 7).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(300,0).on(ev,fp).id('k'+(n+ 9)).data('note',n+ 9).data('b',false).attr(white).stroke(stroke);
					gKey.rect(60,200).move(360,0).on(ev,fp).id('k'+(n+11)).data('note',n+11).data('b',false).attr(white).stroke(stroke);
					
					gKey.rect(35,130).move(35 ,0).on(ev,fp).id('k'+(n+ 1)).data('note',n+ 1).data('b',true);
					gKey.rect(35,130).move(105,0).on(ev,fp).id('k'+(n+ 3)).data('note',n+ 3).data('b',true);
					gKey.rect(35,130).move(210,0).on(ev,fp).id('k'+(n+ 6)).data('note',n+ 6).data('b',true);
					gKey.rect(35,130).move(280,0).on(ev,fp).id('k'+(n+ 8)).data('note',n+ 8).data('b',true);
					gKey.rect(35,130).move(350,0).on(ev,fp).id('k'+(n+10)).data('note',n+10).data('b',true);
		
					// Group transform
					gKey.translate(transW * i, 0, 0, 0);
					gKey.scale(scale, scale, 0, 0);
				}

				// this.svg.hide();
			},

			press: function(event) {
				let active = event.type[5] == "d"; // mousedown
				mt.screen.piano.keyEffect(this, active);
				mt.jzz.send(this.data('note'), active); // Phát midi
			},

			keyEffect: function(svgObj, active) {
				svgObj.attr({fill:(active ? '#ccc' : (svgObj.data('b')?'#000':'#fff'))});
			}
		},

		design: {
			groupGrid: null,
			groupAdd: null,
			width: 0,
			height: 0,

			draw: function() {
				this.width = mt.screen.width;
				this.height = mt.screen.piano.hOffset;

				let colN = 60; // 12(phím) * 5(dãy)
				let rowN = 10;
				let cWidth = this.width / colN;
				let cHeight = this.height / rowN;

				this.groupGrid = mt.screen.svg.group();
				this.groupGrid.stroke({ color:'#0088ff', opacity:0.0, width:1 });
				for (let row=0; row<rowN; row++) {
					let g = this.groupGrid.group();
					for (let col=0; col<colN; col++) {

						let r = g.rect(cWidth,cHeight)
								.move(cWidth*col,cHeight*row)
								.attr({ fill:'#eeeeff' })
								.data('note', col + 36)
								.data('time', (rowN-1-row) * 50);

						// Event
						r.on('mouseover', function() {
							this.stroke({ opacity:1 });
						});
						r.on('mouseout', function() {
							this.stroke({ opacity:0 });
						});
						r.on('click', function() {
							mt.screen.design.add(this);
						});
					}
				}
				
				this.groupAdd = mt.screen.svg.group();
			},

			add: function(ref) {
				let r = this.groupAdd.rect(ref.width(), ref.height())
									.move(ref.x(), ref.y())
									.data('note', ref.data('note'))
									.data('time', ref.data('time'))
									.attr({ fill:'#08f' });
	
				r.stroke({ color:'#03f', opacity:0.0, width:1 });
	
				// Event
				r.on('click', function() {
					this.remove();
				});

				// Effect
				r.on('mouseover', function() {
					this.stroke({ opacity:1 });
				});
				r.on('mouseout', function() {
					this.stroke({ opacity:0 });
				});
				let note = ref.data('note');
				mt.jzz.send(note, true);
				setTimeout(() => { mt.jzz.send(note, false); }, 1000);
			},

			getNotes: function() {

				let lstRect = this.groupAdd.children();
				let lstNote = [];
				for (let i=0; i<lstRect.length; i++) {
					let rect = lstRect[i];
					lstNote.push({
						time: rect.data('time'),
						note: rect.data('note'),
						velocity: rect.data('velocity') || 127,
						duration: rect.data('duration') || 50,
					});
				}
				lstNote.sort((a, b) => a.time - b.time);
				return lstNote;
			},

			show: function(toogle) {
				if (toogle) {
					this.groupGrid.show();
					this.groupAdd.show();
				} else {
					this.groupGrid.hide();
					this.groupAdd.hide();
				}
			},
	
			covColNoteN: function(col) {
				if (this._cov == undefined) {
					this._cov = [0,2,4,5,7,9,11];
				}
				let lvl = Math.floor(col / 7);
				let stt = col % 7;
				return 36 + lvl * 12 + this._cov[stt];
			}
		},

		ruler: {
			group: null,
			len: 10,

			draw: function() {
				let svg = mt.screen.svg;
				let design = mt.screen.design;

				this.group = svg.group();
				let perSecLen = design.height / this.len;
				let pattern = svg.pattern(10, perSecLen, function(pattern) {
					pattern.rect(10, 1);
				});
				this.group.rect(8, design.height).move(design.width+1, 0).attr({ fill: pattern });
			}
		},

		note: {
			svg: null,
			timeline: null,
			width: 0,
			height: 0,
			size: [], // height widthN widthS
			_covN: {0:0, 2:1, 4:2, 5:3, 7:4, 9:5, 11:6},
			rulerTime: 2000,

			init: function() {

				this.width = mt.screen.width;
				this.height = mt.screen.height - mt.screen.piano.height;
				
				// Cal note size
				this.size = [
					this.height / 10.0,
					this.width / 35.0,
					this.width / 60.0
				];

				$('#note').css({ 'width':this.width, 'height':this.height, 'margin':'auto' });
				this.svg = SVG().addTo('#note').size('100%', '100%');
				this.svg.stroke({ color: '#000000', width: 1 }); // Effect note

				this.timeline = new SVG.Timeline().persist(true);

				// let g = this.group;
				// g.clear(); // remove all child
				// this.data = mt.screen.design.getNotes();

				// let lstNoteN = [], lstNoteS = [];
				// for (let i=0; i<this.data.length; i++) {
				// 	let note = this.data[i];
				// 	if (mt.util.checkSharp(note.note))
				// 		lstNoteS.push(note);
				// 	else
				// 		lstNoteN.push(note);
				// }

				// for (let i=0; i<lstNoteN.length; i++) {
				// 	let info = mt.screen.util.rectInfo(lstNoteN[i]);
				// 	g.rect(info.width, info.height)
				// 	 .move(info.x, info.y)
				// 	 .attr({ fill:'#ff0' });
				// }

				// for (let i=0; i<lstNoteS.length; i++) {
				// 	let info = mt.screen.util.rectInfo(lstNoteS[i]);
				// 	g.rect(info.width, info.height)
				// 	 .move(info.x, info.y)
				// 	 .attr({ fill:'#ff0' });
				// }
			},

			show: function(toogle) {
				if (!toogle) {
					this.group.hide();
					return;
				}
				this.group.show();
				this.draw();
			},

			prepare: function() {
				this.svg.clear();
				for (let i=0; i<mt.midi.notes.length; i++) {
					let n = mt.midi.notes[i]; // Thông tin note
					let time = n.time * mt.midi.factor; // Thời điểm mili giây
					let duration = n.duration * mt.midi.factor; // Thời lượng mili giây
					let h = this.size[0] * (10000.0/this.rulerTime) * (duration/1000.0); // Độ dài note
					let fS = mt.util.checkSharp(n.note); // Thanh sắc hay thanh thường

					// Vị trí ngang của note trên màn hình
					let x = n.note - 36;
					if (fS) x *= this.size[2];
					else x = (Math.floor(x / 12) * 7 + (this._covN[x % 12])) * this.size[1];

					this.svg
						.rect(this.size[fS?2:1], h)								// kích thước note
						.move(x,-h)												// Vị trí bán đầu
						.attr({fill:(fS?'#3859F7':'#85C6FF')})					// Màu sắc
						.radius(fS?6:8, fS?8:12)								// Làm tròn góc
						.timeline(this.timeline)								// Quản lý thời gian chung
						.animate(this.rulerTime + duration, time, 'absolute')	// Thời lượng và độ trễ hoạt cảnh
						.ease('-')												// Hoạt cảnh tuyến tính
						.move(x, this.height);									// Vị trí đích
				}
				this.timeline.pause();
			},

			start: function() {
				this.timeline.stop();
				this.timeline.time(0);
				this.timeline.play();
			}
		},
		
		util: {
			rectInfo: function(note) {
				let fS = mt.util.checkSharp(note.note);

				let x = 0;
				if (fS) {
					x = (note.note - 36) * this.noteSize[2];
				} else {
					let base = (note.note - 36);
					x = (Math.floor(base / 12) * 7 + (this._covN[base % 12])) * this.noteSize[1];
				}

				return {
					width: this.noteSize[fS ? 2 : 1],
					height: this.noteSize[0],
					x: x,
					y: (9 - note.time / 50) * this.noteSize[0]
				};
			}
		}
	},
	
	jzz: {
		
		h_cov: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
		
		init: function() {

			// Register
			// JZZ.synth.Tiny.register('Synth');
			JZZ.synth.Tiny.register();

			this.out = JZZ().openMidiOut().or(()=>{ alert('Cannot open MIDI port!'); });
			
			// this.out.volumeF(c, xx);
		},

		send: function(note, toggle) {
			let offsetNote = mt.tool.offsetNote.get();
			let finalNote = note + offsetNote;
			finalNote = Math.max(finalNote, 0);
			finalNote = Math.min(finalNote, 127);

			if (toggle) {
				this.out.send([0x90, finalNote, 0x7f]);
				mt.key._keyname.text("Key: " + finalNote + " - " + mt.jzz.num2name(finalNote)); // Show keyname
			}
			else
				this.out.send([0x80, finalNote, 0]);
		},

		setInstrument: function(num) { // 0 - 127
			this.out.program(0, num);
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
				if (this.h_cov[i] == baseCode) {
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
			return this.h_cov[num % 12] + (Math.floor(num / 12) - 1);
		},

	},

	key: {

		/**
		 * key: keyCode of keyBoard
		 * value: {
		 * 	note: number - for jzz
		 * 	press: bool - on or off
		 * }
		**/
		map: {},

		_keyname: null,

		init: function() {

			// Init component
			this._keyname = $('#keyname');

			// Init keybind
			let t = this.bind;
			// 123
			t('`', 'D#5'); t('2', 'F#5'); t('3', 'G#5'); t('4', 'Bb5'); t('6', 'C#6'); t('7', 'D#6'); t('9', 'F#6'); t('0', 'G#6'); t('-', 'Bb6');
			// QWE
			t('\t', 'E5'); t('Q',  'F5'); t('W',  'G5'); t('E', 'A5'); t('R', 'B5'); t('T',  'C6'); t('Y',  'D6');
			t('U',  'E6'); t('I',  'F6'); t('O',  'G6'); t('P', 'A6'); t('[', 'B6'); t(']',  'C7');
			t('DL', 'E7'); t('ED', 'F7'); t('PD', 'G7');
			// \n & \
			t('\n', 'F3'); t('\\', 'D7');
			// t('\\', 'F3'); t('\n', 'D7');
			// ASD
			t('CL', 'D5'); t('A', 'C5'); t('S', 'B4'); t('D', 'A4'); t('F',  'G4'); t('G',  'F4'); t('H', 'E4');
			t('J',  'D4'); t('K', 'C4'); t('L', 'B3'); t(';', 'A3'); t('\'', 'G3');
			// ZXC
			t('SH', 'C#5'); t('X', 'Bb4'); t('C', 'G#4'); t('V', 'F#4'); t('N', 'D#4'); t('M', 'C#4'); t('.', 'Bb3'); t('/', 'G#3');
		},

		bind: function(key, note) {
			let keyCode = mt.util.covKeyCharKeyCode(key);
			let noteNum = mt.util.covCodeNumJzzMidi(note);
			if (!keyCode || !noteNum) return;
			mt.key.map[keyCode] = { note: noteNum };
		},

		reset: function() {
			for (keyCode in this.map) {
				keyPress = this.map[keyCode];
				if (keyPress.press) {
					keyPress.press = false;
					mt.jzz.send(keyPress.note, false);
				}
			}
		},
		
		keyDown: function(e) {
			var e = window.event || e;
			let keyCode = e.keyCode;
			let keyPress = mt.key.map[keyCode];
			if (keyPress && !keyPress.press) {
				keyPress.press = true;
				mt.screen.piano.keyEffect(SVG('#k'+keyPress.note), true);
				mt.jzz.send(keyPress.note, true);
			}
			if (e.keyCode == 123 || e.keyCode == 116)
				return true;
			return false;
		},

		keyUp: function(e) {
			var e = window.event || e;
			let keyCode = e.keyCode;
			let keyPress = mt.key.map[keyCode];
			if (keyPress)
			{
				keyPress.press = false;
				mt.screen.piano.keyEffect(SVG('#k'+keyPress.note), false);
				mt.jzz.send(keyPress.note, false);
			}
			
			if (e.keyCode == 123)
				return true;

			return false;
		}
	},

	event: {

		init: function() {
			window.onfocus = this.focus;
			window.onblur = this.blur;
		},

		focus: function() {
			mt.tool.bind.bindKeyBoard(true);
		},

		blur: function() {
			mt.tool.bind.bindKeyBoard(false);
			mt.key.reset();
		}
	},

	util: {

		covKeyCharKeyCode: function(value, direct = true) {
			if (!value) return undefined;
			if (!mt._covKeyCharKeyCode)
			{
				mt._covKeyCharKeyCode = {};
				let m = mt._covKeyCharKeyCode;
				// Fx
				m['F1'] = 112; m['F2'] = 113; m['F3'] = 114; m['F4'] = 115;
				m['F5'] = 116; m['F6'] = 117; m['F7'] = 118; m['F8'] = 119;
				m['F9'] = 120; m['F10'] = 121; m['F11'] = 122; m['F12'] = 123;
				// 123
				m['`'] = 192; m['1'] = 49; m['2'] = 50; m['3'] = 51; m['4'] = 52;
				m['5'] = 53; m['6'] = 54; m['7'] = 55; m['8'] = 56; m['9'] = 57;
				m['0'] = 48; m['-'] = 189; m['='] = 187; m['\b'] = 8;
				// QWE
				m['\t'] = 9; m['Q'] = 81; m['W'] = 87; m['E'] = 69; m['R'] = 82;
				m['T'] = 84; m['Y'] = 89; m['U'] = 85; m['I'] = 73; m['O'] = 79;
				m['P'] = 80; m['['] = 219; m[']'] = 221; m['\\'] = 220; m['DL'] = 46;
				m['ED'] = 35; m['PD'] = 34;
	
				// ASD
				m['CL'] = 20; m['A'] = 65; m['S'] = 83; m['D'] = 68; m['F'] = 70;
				m['G'] = 71; m['H'] = 72; m['J'] = 74; m['K'] = 75; m['L'] = 76;
				m[';'] = 186; m['\''] = 222; m['\n'] = 13;
				// ZXC
				m['Z'] = 90; m['X'] = 88; m['C'] = 67; m['V'] = 86; m['B'] = 66;
				m['N'] = 78; m['M'] = 77; m[','] = 188; m['.'] = 190; m['/'] = 191;
				m['SH'] = 16;
			}
	
			if (direct) {
				return mt._covKeyCharKeyCode[value];
			} else {
				for (key in mt._covKeyCharKeyCode)
					if (mt._covKeyCharKeyCode[key] == value)
						return value;
				return undefined;
			}
		},

		covCodeNumJzzMidi: function(value, direct = true) {
			if (!value) return undefined;
			if (!mt._covCodeNumJzzMidi) {
				mt._covCodeNumJzzMidi = ['C','C#','D','D#','E','F','F#','G','G#','A','Bb','B'];
			}
	
			if (direct) {
				if (value.length < 2)
					return undefined;
				
				let level = parseInt(value.substring(value.length-1));
				if (isNaN(level) || level < 0 || level > 9)
					return undefined;
				
				let baseCode = value.substring(0, value.length-1);
				let baseNum = undefined;
				for (let i=0; i<mt._covCodeNumJzzMidi.length; i++) {
					if (mt._covCodeNumJzzMidi[i] == baseCode)
						baseNum = i;
				}
				if (baseNum == undefined)
					return undefined;
				
				return level * 12 + baseNum;
			} else {
				if (isNaN(value) || value < 0 || value > 119)
					return undefined;
				
				let level = Math.floor(value / 12);
				let baseNum = value % 12;
				let baseCode = mt._covCodeNumJzzMidi[baseNum];
	
				return baseCode + level;
			}
		},

		checkSharp: function(note) {
			let v = note % 12;
			return (v==1 || v==3 || v==6 || v==8 || v==10);
		}
	},

};
