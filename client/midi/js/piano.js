	var piano = {

	// Variables
	jzzPort: null,

	/**
	 * key: keyCode of keyBoard
	 * value: {
	 * 	note: number - for jzz
	 * 	press: bool - on or off
	 * }
	**/
	keyMap: {},

	isHookKeyBoard: false,
	offsetNote: 0,

	// General
	init: function() {
		// Register event
		window.onfocus = () => {
			piano.hookKeyBoard(true);
		}
		window.onblur = () => {
			piano.hookKeyBoard(false);
			piano.resetKey();
		}

		// Init component
		piano.initUI();
		piano.initJZZ();
		piano.initKeyMap();

		piano.hookKeyBoard(true);
	},

	initUI: () => {
		// Power
		// $("#btn_power").button({
		// 	icon: "ui-icon-circle-check",
		// 	showLabel: false
		// });
		// $("#btn_power").button().click(function() {
		// 	piano.hookKeyBoard(!piano.isHookKeyBoard);
		// });
		$("#btn_power .ui-icon").css("font-size", "135%");
		$("#btn_power .ui-icon").css("color", "#00FF00");

		// Offset note
		// $("#spn_offset_note").spinner({
		// 	value: 0,
		// 	change: (event, ui) => {
		// 		piano.offsetNote = $( "#spn_offset_note" ).spinner("value");
		// 	}
		// });
	},

	initJZZ: function() {
		JZZ.synth.Tiny.register('Synth');
		piano.jzzPort = JZZ().openMidiOut().or(()=>{alert('Cannot open MIDI port!');});

		// piano.jzzPort.volumeF(c, xx);
		piano.jzzPort.program(0, 7); // change program
		// 0, 16
	},

	initKeyMap: function() {
		/*
		C4	48		C5	60
		C#4	49		C#5	61
		D4	50		D5	62
		D#4	51		D#5	63
		E4	52		E5	64
		F4	53		F5	65
		F#4	54		F#5	66
		G4	55		G5	67
		G#4	56		G#5	68
		A4	57		A5	69
		Bb4	58		Bb5	70
		B4	59		B5	71
		*/

		let t = piano.bindKey;
		// 123
		t('2', 'F#5'); t('3', 'G#5'); t('4', 'Bb5'); t('6', 'C#6'); t('7', 'D#6'); t('9', 'F#6'); t('0', 'G#6'); t('-', 'Bb6');

		// QWE
		t('\t', 'E5'); t('Q',  'F5'); t('W',  'G5'); t('E', 'A5'); t('R', 'B5'); t('T',  'C6'); t('Y',  'D6');
		t('U',  'E6'); t('I',  'F6'); t('O',  'G6'); t('P', 'A6'); t('[', 'B6'); t(']',  'C7');
		t('DL', 'E7'); t('ED', 'F7'); t('PD', 'G7');

		// \n & \
		// t('\n', 'F3'); t('\\', 'D7');
		t('\\', 'F3'); t('\n', 'D7');

		// ASD
		t('CL', 'D5'); t('A', 'C5'); t('S', 'B4'); t('D', 'A4'); t('F',  'G4'); t('G',  'F4'); t('H', 'E4');
		t('J',  'D4'); t('K', 'C4'); t('L', 'B3'); t(';', 'A3'); t('\'', 'G3');
		
		// t('6',  'C8'); t('7',  'D8'); t('8',  'E8'); t('9',  'F8'); t('0', 'G8'); t('-', 'A8'); t('=', 'B8');
		// t(']',  'C7'); t('\\', 'D7'); t('1',  'E7'); t('2',  'F7'); t('3', 'G7'); t('4', 'A7'); t('5', 'B7');
		// t('T',  'C6'); t('Y',  'D6'); t('U',  'E6'); t('I',  'F6'); t('O', 'G6'); t('P', 'A6'); t('[', 'B6');
		// t('\'', 'C5'); t('\n', 'D5'); t('\t', 'E5'); t('Q',  'F5'); t('W', 'G5'); t('E', 'A5'); t('R', 'B5');
		// t('F',  'C4'); t('G',  'D4'); t('H',  'E4'); t('J',  'F4'); t('K', 'G4'); t('L', 'A4'); t(';', 'B4');
		// t('.',  'C3'); t('/',  'D3'); t('SH', 'E3'); t('CL', 'F3'); t('A', 'G3'); t('S', 'A3'); t('D', 'B3');
		// t('X',  'C2'); t('C',  'D2'); t('V',  'E2'); t('B',  'F2'); t('N', 'G2'); t('M', 'A2'); t(',', 'B2');
		// t('Z',  'B1');

		// t = piano.bindKeyEx;
		// t('6',  '7',  'C#8'); t('7',  '8',  'D#8'); t('9', '0', 'F#8'); t('0', '-', 'G#8'); t('-', '=', 'Bb8');
		// t(']',  '\\', 'C#7'); t('\\', '1',  'D#7'); t('2', '3', 'F#7'); t('3', '4', 'G#7'); t('4', '5', 'Bb7');
		// t('T',  'Y',  'C#6'); t('Y',  'U',  'D#6'); t('I', 'O', 'F#6'); t('O', 'P', 'G#6'); t('P', '[', 'Bb6');
		// t('\\', '\n', 'C#5'); t('\n', '\t', 'D#5'); t('Q', 'W', 'F#5'); t('W', 'E', 'G#5'); t('E', 'R', 'Bb5');
		// t('F',  'G',  'C#4'); t('G',  'H',  'D#4'); t('J', 'K', 'F#4'); t('K', 'L', 'G#4'); t('L', ';', 'Bb4');
		// t('.',  '/',  'C#3'); t('/',  's',  'D#3'); t('c', 'A', 'F#3'); t('A', 'S', 'G#3'); t('S', 'D', 'Bb3');
		// t('X',  'C',  'C#2'); t('C',  'V',  'D#2'); t('B', 'N', 'F#2'); t('N', 'M', 'G#2'); t('M', ',', 'Bb2');
	},

	bindKey: function(key, note) {
		let keyCode = piano.covKeyCharKeyCode(key);
		let noteNum = piano.covCodeNumJzzMidi(note);
		if (!keyCode || !noteNum) return;
		
		piano.keyMap[keyCode] = { note: noteNum };
	},

	hookKeyBoard: function(toogle) {
		if (toogle == piano.isHookKeyBoard)
			return;

		piano.isHookKeyBoard = toogle;

		if (toogle) {
			document.onkeydown = piano.keyDown;
			document.onkeyup = piano.keyUp;
			// $("#btn_power").button("option", "icon", "ui-icon-circle-check");
			$("#btn_power").css("color", "green");
		} else {
			document.onkeydown = undefined;
			document.onkeyup = undefined;
			// $("#btn_power").button("option", "icon", "ui-icon-power");
			$("#btn_power").css("color", "red");
		}
	},

	// Event
	keyDown: function(e) {
		// debug show key info
		// console.log(e.key+' - '+e.keyCode);
		// return false;

		var e = window.event || e;
		let keyCode = e.keyCode;
		let keyPress = piano.keyMap[keyCode];

		if (keyPress && !keyPress.press) {
			keyPress.press = true;
			piano.jzzPiano(keyPress.note, true);
		}
		
		return false;
	},
	
	keyUp: function(e) {
		var e = window.event || e;
		let keyCode = e.keyCode;

		let keyPress = piano.keyMap[keyCode];
		if (keyPress)
		{
			keyPress.press = false;
			piano.jzzPiano(keyPress.note, false);
		}
		
		return false;
	},

	resetKey: function() {
		for (keyCode in piano.keyMap) {
			keyPress = piano.keyMap[keyCode];
			if (keyPress.press) {
				keyPress.press = false;
				piano.jzzPiano(keyPress.note, false);
			}
		}
	},

	// API
	jzzPiano: function(note, toggle) {
		let finalNote = note + piano.offsetNote;
		finalNote = Math.max(finalNote, 0);
		finalNote = Math.min(finalNote, 127);
		
		if (toggle)
			piano.jzzPort.send([0x90, finalNote, 0x7f]);
		else
			piano.jzzPort.send([0x80, finalNote, 0]);
	},

	// Utils
	covKeyCharKeyCode: function(value, direct = true) {
		if (!value) return undefined;
		if (!piano._covKeyCharKeyCode)
		{
			piano._covKeyCharKeyCode = {};
			let m = piano._covKeyCharKeyCode;
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
			return piano._covKeyCharKeyCode[value];
		} else {
			for (key in piano._covKeyCharKeyCode)
				if (piano._covKeyCharKeyCode[key] == value)
					return value;
			return undefined;
		}
	},

	covCodeNumJzzMidi: function(value, direct = true) {
		if (!value) return undefined;
		if (!piano._covCodeNumJzzMidi) {
			piano._covCodeNumJzzMidi = ['C','C#','D','D#','E','F','F#','G','G#','A','Bb','B'];
		}

		if (direct) {
			if (value.length < 2)
				return undefined;
			
			let level = parseInt(value.substring(value.length-1));
			if (isNaN(level) || level < 0 || level > 9)
				return undefined;
			
			let baseCode = value.substring(0, value.length-1);
			let baseNum = undefined;
			for (let i=0; i<piano._covCodeNumJzzMidi.length; i++) {
				if (piano._covCodeNumJzzMidi[i] == baseCode)
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
			let baseCode = piano._covCodeNumJzzMidi[baseNum];

			return baseCode + level;
		}
	},
};

piano.init();
