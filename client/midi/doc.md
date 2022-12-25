
# Midi range

> let o = (v) => {return Tone.Frequency(v, "midi").toNote()}

12		C0
13		C#0
14		D0
15		D#0
16		E0
17		F0
18		F#0
19		G0
20		G#0
21		A0
22		A#0
23		B0

12		C0
24		C1
36		C2
48		C3
60		C4
72		C5
84		C6
96		C7
108		C8
120		C9

Default C4 -> B6


# Strut

mt.mgr.tracks = [ track, track, ... ]

track = notes = [ note, note, ... ]



note = {
	mote_midi,
	duration,
	time,
	velocity
}

mt.mgr.curNote = {

	index, // index in notes[note.note] - vị trí trong lst con của mgr.notes
	data, // note struct


}
