var mt = {
	musics: [],
	musicCurId: -1,
	history: [],
	isPlay: false,
	isEdit: false,
	duration: 0,
	_blogUrl: '',
	_focus: true,

	quick: function() {
		
	},

	init: function() {
		this.c_layout.init();
		this.c_player.init();
		this.c_wave.init();
		this.c_pause.init();
		this.c_next.init();
		this.c_back.init();
		this.c_volumeBar.init();
		this.c_btnVolume.init();
		this.c_autoNext.init();
		this.c_loop.init();
		this.c_tabInclude.init();
		this.c_tabExclude.init();
		this.c_listnext.init();
		this.c_list.init();
		this.c_drawer.init();
		this.cut.init();

		this.event.init();
		this.effect.init();

		// Set default
		this.set_authorize();

		// Process URL Param OR Auto play
		this.handler.prepare();

		// DEV
		this.quick();
	},

	mgr: {

	},

	handler: {

		_target: null,

		begin: function(target) {
			if (target != undefined) {
				if (this._target != null)
					return true;
				this._target = target;
			}
			return false;
		},

		end: function(target) {
			if (target != undefined) {
				this._target = null;
			}
		},

		prepare: function() {

			// Get param
			let urlParams = new URLSearchParams(window.location.search);
			let param = {
				stt: urlParams.get('stt')
			};

			// Reset URL
			window.history.pushState('', '', '/music');

			// Auto play
			setTimeout(() => {
				if (param.stt != null && !isNaN(param.stt))
					mt.c_listnext.push(param.stt, '');

				mt.handler.next("auto");
			}, 1000);
		},

		pause: function(target) {
			
			// mt.event.keydown.space
			// mt.c_pause.click

			if (this.begin(target))
				return;
			
			if (mt.musicCurId == -1) {
				this.next();
				return;
			}

			mt.c_player.pause();
			mt.c_pause.switchIcon();

			this.end(target);
		},

		next: function(target) {
			if (this.begin(target))
				return;

			// mt.event.keydown.enter
			// mt.c_next.click
			// mt.c_player.onEnd

			// If list next have data, get it
			let row = mt.c_listnext.pop();
			if (row != null) {
				// change loop
				mt.c_loop.set(row.loop);

				// change music
				this.changeMusic(row.stt);
				return;
			}

			let i = 0;
			if (mt.c_autoNext.value())
				i = Math.floor(Math.random() * mt.musics.length);
			else {
				i = mt.musicCurId + 1;
				if (i >= mt.musics.length)
					i = 0;
			}

			this.changeMusic(i);
		},

		changeMusic: function(musicId, target) {
			
			if (this.begin(target))
				return;

			// Add history (exception BACK)
			if (mt.musicCurId != -1 && this._target != "mt.c_back.click")
				mt.history.push(mt.musicCurId);

			// Select Row (just UI) and Roll to [exception mt.c_list.selectRow]
			if (this._target != "mt.c_list.clickRow") {
				setTimeout(() => { mt.c_list.scrollToCur() }, 500); // Scroll to music
				mt.c_list.component.datagrid('selectRow', musicId); // Show select row on datagrid
			}

			// Handler
			mt.musicCurId = musicId;
			let music = mt.musics[musicId];

			// Chage name on UI
			document.title = music.name;
			mt.c_layout.changeCenterTitle(music.name);

			// Set volume
			mt.c_volumeBar.setOffset(music.decibel)
			mt.c_volumeBar.setVolume();

			// Clean Wave
			mt.c_wave.clear();

			// Load music
			$.ajax({
				type: 'GET',
				url: '/music/getMusic?name='+music.name,
				xhrFields: { responseType: 'arraybuffer'},
				success: this.changeMusicPost
			});

			// Call event
			mt.event.changeMusic();
		},

		changeMusicPost: function(res) {

			// Free and Create BlogUrl
			if (mt._blogUrl.length > 0)
				URL.revokeObjectURL(mt._blogUrl);
			
			mt._blogUrl = URL.createObjectURL(new Blob([res]));

			// Load to player
			let c = mt.c_player.component[0];
			c.src = mt._blogUrl;
			c.pause();
			c.load();
			c.oncanplaythrough = c.play();

			// Generate Wave
			mt.c_wave.generate(res);

			// Value
			mt.isPlay = true;
			mt.c_pause.switchIcon();

			mt.handler.end("force");
		},

		share: function() {
			$.get('/common/getIPLocal', function(data, status) {
				if (status == 'success') {
					let url = data.IP + "/music?stt=" + mt.musicCurId;
					navigator.clipboard.writeText(url).then(function() {
						$.messager.show({
							title: 'Notice',
							msg: 'Copied link',
							timeout: 1500,
							showType: 'slide'
						});
					});
				}
			});
		}
		
	},

	event: {

		init: function() {
			this.resize();
			this.keypress();
			this.onfocus();
			// this.media();
		},

		resize: function() {
			window.addEventListener('resize', function (event) {

			});
		},

		keypress: function() {

			window.addEventListener('keyup', function(event) {
			});

			window.addEventListener('keydown', function(event) {
				let isAction = false;
				if (event.code === 'Space') {
					isAction = true;
					mt.handler.pause("mt.event.keydown.space");
				} else if (event.code === 'Enter') {
					if (mt.isEdit == false) {
						isAction = true;
						mt.handler.next("mt.event.keydown.enter");
					}
				}
				
				if (isAction)
					event.preventDefault();
				return !isAction;
			});
		},

		onfocus: function() {
			window.onfocus = function() {
				mt.c_list.scrollToCur();
				mt._focus = true;
			};
		},

		onblur: function() {
			window.onblur = function() {
				mt._focus = false;
			}
		},

		media: function() {
			navigator.mediaSession.setActionHandler('play', () => { mt.handler.pause("mt.event.media.play") });
			navigator.mediaSession.setActionHandler('pause', () => { mt.handler.pause("mt.event.media.pause") });
			// navigator.mediaSession.setActionHandler('seekbackward', function() { alert('seekbackward') });
			// navigator.mediaSession.setActionHandler('seekforward', function() { alert('seekforward') });
			navigator.mediaSession.setActionHandler('previoustrack', () => { mt.c_back.onClick() });
			navigator.mediaSession.setActionHandler('nexttrack', () => { mt.c_next.onClick() });
		},

		changeMusic: function() {

		},

		loadedMusic: function() {

			// Wave
			mt.c_wave._durationTimeLbl.html(mt.util.cov_time(mt.duration));

		},

		playMusic: function() {
			mt.c_wave.update(this.currentTime);
			mt.cut.onUpdate(this.currentTime);

			// Wave
			mt.c_wave._currentTimeLbl.html(mt.util.cov_time(this.currentTime));
		},

		endMusic: function() {

		},

	},

	component: {

	},

	util: {

		cov_time: function(value) {
			let valueR = Math.floor(value);
			let minute = Math.floor(valueR/60);
			let second = valueR%60;
			if (second < 10) second = '0'+second;
			return minute+':'+second;
		},

		cov_time_decimal: function(value) {
			let backV = value * 100 % 100 / 100;
			return this.cov_time(value)+backV;
		}
	},

	effect: {

		init: function() {
			this.soundClick.init();
		},

		soundClick: {
			_sndClick: null,
			init: function() {
				this._sndClick = new Audio('/res/effect/sound/mixkit-video-game-mystery-alert-234.wav');
			},
			play: function() {
				this._sndClick.play();
			}
		}

	},

	c_layout: {
		component: null,

		init: function() {
			let c = $('#layout');
			this.component = c;
			c.layout({ fit: true });
			c.layout('panel', 'center').panel('options').onResize = mt.c_layout.onCenterResize;
		},

		changeCenterTitle: function(name) {
			this.component.layout('panel', 'center').panel({title: 'Name: ' + name});
		},

		onCenterResize: function(width, height) {
			let ops = mt.c_layout.component.layout('panel', 'center').panel('options');
			mt.c_list.component.datagrid({ width:ops.width - 12, height:ops.height - 48 });
		}
	},

	c_player: {
		component: null,

		init: function() {
			let c = $("#player");
			this.component = c;
			c.on("ended", mt.c_player.onEnd);
			c.on("loadeddata", mt.c_player.onLoadedData);
			c.on("timeupdate", mt.event.playMusic);
			c.prop("volume", mt.c_volumeBar.base);
		},

		changeMusic: function(index) {

			
		},

		onEnd: function(event) {
			let result = mt.cut.onPlayerEnd();

			if (result) {
				if (mt.c_loop.pop())
					mt.c_player.replay();
				else
					mt.handler.next("mt.c_player.onEnd");
			}
		},

		onLoadedData: function() {

			// value
			mt.duration = this.duration;

			// List duration
			if (mt.musics[mt.musicCurId].duration == null) {
				let durationStr = mt.util.cov_time(mt.duration);
				mt.c_list.showDuration(durationStr);
			}

			// register event
			mt.event.media();
			
			// Tool cut
			mt.cut.onChangeMusic();

			// Call Event
			mt.event.loadedMusic();
		},

		setVolume: function(n) {
			if (!isNaN(n)) {
				if (n > 1.0) n = 1.0;
				else if (n < 0.0) n = 0.0;
				mt.c_player.component.prop("volume", n);
			}
		},

		replay: function() {
			let c = mt.c_player.component;
			c[0].currentTime = 0;
			c[0].play();
		},

		pause: function(flag) {
			let c = this.component;
			if (flag === undefined)
			flag = c[0].paused == false;
				
			flag ? c[0].pause() : c[0].play();
			
			mt.isPlay = !flag;
		},

		changeTime: function(value) {
			this.component[0].currentTime = value;
		}
	},

	c_wave: {
		_staticWave: null,
		_curStaticWave: null,
		_currentTimeLbl: null,
		_durationTimeLbl: null,
		_dynamicWave: null,
		_context: null,
		_source: null,
		_ctx: null,
		_currentTime: 0,
		_waveColor1: '#f0f0f0',
		_waveColor2: '#ffe48d',

		init: function() {
			this._staticWave = $('#staticWave');
			this._curStaticWave = $('#curStaticWave');
			this._currentTimeLbl = $('#currentTime');
			this._durationTimeLbl = $('#durationTime');

			this._dynamicWave = $('#dynamicWave');

			this._staticWave[0].addEventListener('click', this.clickStatic, false);
			this._dynamicWave[0].addEventListener('click', this.clickDynamic, false);

			const AudioContext = window.AudioContext || window.webkitAudioContext;
			this._context = new AudioContext();

			let canvas = this._staticWave[0];
			this._ctx = canvas.getContext('2d');

			this.dynamicWave();
		},

		clear: function() {
			this._ctx.fillStyle = "rgba(0,0,0,1)";
			this._ctx.globalCompositeOperation = "destination-out";
			this._ctx.clearRect(0, 0, this._staticWave[0].width, this._staticWave[0].height);
		},

		generate: function(res) {
			this._context.decodeAudioData(res, (buffer) => {

				// buffer: AudioBuffer

				let w = this._staticWave[0].clientWidth;
				let h = this._staticWave[0].clientHeight;
				
				this._staticWave[0].width = w;
				this._staticWave[0].height = h;

				this._ctx.fillStyle = this._waveColor1;
				this._ctx.globalCompositeOperation = 'source-over';

				let data = buffer.getChannelData(0);
				let step = Math.ceil(data.length / w);
				let amp = h / 2;
				for (let i=0; i < w; i++) {
					let min = 1.0;
					let max = -1.0;
					for (let j=0; j<step; j++) {
						let datum = data[(i*step)+j];
						if (datum < min) min = datum;
						if (datum > max) max = datum;
					}
					this._ctx.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
				}
				
				this._ctx.globalCompositeOperation='source-atop';
				this._currentTime = 0;
			});
		},

		update: function(currentTime) {
			if (!mt._focus)
				return;

			let w = this._staticWave[0].clientWidth;
			let h = this._staticWave[0].clientHeight;
			let pos = currentTime / mt.duration * w;

			if (currentTime > this._currentTime) {
				this._ctx.fillStyle = this._waveColor2;
				this._ctx.fillRect(0, 0, pos, h);
			} else {
				this._ctx.fillStyle = this._waveColor1;
				this._ctx.fillRect(pos, 0, w, h);
			}

			this._curStaticWave.css('left',pos);

			this._currentTime = currentTime;
		},

		clickStatic: function(e) {
			let curTime = e.offsetX / e.target.offsetWidth * mt.duration;
			mt.c_player.changeTime(curTime);
		},

		clickDynamic: function() {
			mt.c_list.scrollToCur();
		},

		dynamicWave: function() {

			if (window.location.href.startsWith('http://localhost/')) {
				var analyser = this._context.createAnalyser();
				analyser.fftSize = 512;
				var source = this._context.createMediaElementSource(mt.c_player.component[0]);
			
				source.connect(analyser);
				analyser.connect(this._context.destination);
			
				var bufferLength = analyser.frequencyBinCount;
				var dataArray = new Uint8Array(bufferLength);
	
				var canvas = this._dynamicWave[0];
				canvas.width = canvas.clientWidth;
				canvas.height = canvas.clientHeight;
			
				var ctx = canvas.getContext("2d");
				var WIDTH = canvas.width;
				var HEIGHT = canvas.height;
			
				var barWidth = WIDTH / bufferLength * 1.5;
				var barHeight;
	
				function renderFrame() {
					requestAnimationFrame(renderFrame);
			
					analyser.getByteFrequencyData(dataArray);
			
					ctx.clearRect(0, 0, WIDTH, HEIGHT);
			
					for (var i = 0, x = 0; i < bufferLength; i++) {
						barHeight = dataArray[i] / 256 * HEIGHT;
	
						var r = barHeight + 25 * (i / bufferLength);
						var g = 250 * (i / bufferLength);
						var b = 50;
			
						ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
						ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
			
						x += barWidth + 2;
					}
				}
	
				renderFrame();
			} else {
				this._dynamicWave.hide();
			}
		},

	},

	c_pause: {
		component: null,
		init: function() {
			let c = $("#btnPause");
			mt.c_pause.component = c;
		},
		onClick: function() {
			mt.handler.pause("mt.c_pause.click");
		},
		switchIcon: function() {
			if (mt.isPlay)
				this.component.linkbutton({ iconCls: 'icon-pause' });
			else
				this.component.linkbutton({ iconCls: 'icon-play' });
		}
	},

	c_next: {
		component: null,
		init: function() {
			this.component = $("#btnNext");
		},
		onClick: function() {
			mt.handler.next("mt.c_next.click");
		}
	},

	c_back: {
		component: null,
		init: function() {
			this.component = $("#btnBack");
		},
		onClick: function() {
			if (mt.history.length > 0)
				mt.handler.changeMusic(mt.history.pop(), "mt.c_back.click");
		}
	},

	c_volumeBar: {
		component: null,
		base: 0.3,
		offset: 100.0,

		init: function() {
			let c = $('#volumeBar');
			this.component = c;
			c.slider({
				mode: 'v',
				height: '90px',
				value: this.base,
				min: 0.0,
				max: 1.0,
				step: 0.02,
				onChange: this.onChange
			});
		},

		onChange: function(newValue, oldValue) {
			let self = mt.c_volumeBar;
			self.base = newValue / (self.offset / 100.0);
			mt.c_player.setVolume(newValue);
			mt.c_btnVolume.update(newValue);
		},

		getVolume: function() {
			return this.component.slider('getValue');
		},

		setVolume: function(volume) {
			if (volume == undefined)
				volume = this.base * (this.offset / 100.0);
			mt.c_volumeBar.component.slider('setValue', volume);
		},

		setOffset: function(offset) {
			this.offset = offset;
		}
	},

	c_btnVolume: {
		component: null,
		status: 0,
		oldValue: 0,

		init: function() {
			this.component = $('#btnVolume');
			this.update(mt.c_volumeBar.base);
		},

		update: function(volume) {
			if (volume == undefined)
				volume = mt.c_volumeBar.getVolume();

			let tmpStatus = 0;
			if (volume > 0.5) tmpStatus = 2;
			else if (volume > 0) tmpStatus = 1;

			if (tmpStatus != this.status) {
				let iconName = 'icon-volume-';
				switch (tmpStatus) {
					case 0: iconName = iconName + 'off'; break;
					case 1: iconName = iconName + 'min'; break;
					case 2: iconName = iconName + 'max'; break;
				}
				this.component.linkbutton({ iconCls: iconName });
				this.status = tmpStatus;
			}
		},

		onClick: function() {
			let curVolume = mt.c_volumeBar.getVolume();

			if (curVolume == 0) {
				mt.c_volumeBar.setVolume(this.oldValue);
			} else {
				this.oldValue = curVolume;
				mt.c_volumeBar.setVolume(0.0);
			}
		}
	},

	c_autoNext: {
		component: null,
		init: function() {
			let c = $("#autoNext");
			mt.c_autoNext.component = c;
		},
		value: function() {
			return mt.c_autoNext.component.switchbutton('options').checked;
		}
	},

	c_loop: {
		component: null,
		init: function() {
			this.component = $("#loop");
		},
		pop: function() {
			let c = this.component;
			let n = c.numberbox('getValue');
			if (n.length > 0 && n > 0) {
				c.numberbox('setValue', n-1);
				return true;
			}
			return false;
		},
		get: function() {
			return parseInt(this.component.numberbox('getValue'));
		},
		set: function(n) {
			this.component.numberbox('setValue', n);
		}
	},

	c_tabInclude: {
		component: null,
		init: function() {
			let c = $('#tagInclude');
			mt.c_tabInclude.component = c;
			c.tagbox({
				label: 'Include: ',
				onChange: mt.c_tabInclude.onChange
			});
		},
		onChange: function(newValue, oldValue) {
			mt.c_list.reload();
		},
		get: function() {
			return mt.c_tabInclude.component.tagbox('getValues');
		}
	},

	c_tabExclude: {
		component: null,
		init: function() {
			let c = $('#tagExclude');
			mt.c_tabExclude.component = c;
			c.tagbox({
				label: 'Exclude: ',
				value: 'less',
				onChange: mt.c_tabExclude.onChange
			});
		},
		onChange: function(newValue, oldValue) {
			mt.c_list.reload();
		},
		get: function() {
			return mt.c_tabExclude.component.tagbox('getValues');
		}
	},

	c_listnext: {

		_listnext: null,

		init: function() {
			this._listnext = $('#listNext');
			this._listnext.datalist({
				width: '100%',
				height: 100,
				rownumbers: true,
				valueField: 'stt',
				textField: 'name',
				onDblClickRow: function(index,row) {
					if (row.loop > 0) { // Nếu có loop thì giảm loop
						row.loop--;
						let pos = row.name.lastIndexOf("(");
						row.name = row.name.substring(0, pos + 1) + row.loop + ")";
						mt.c_listnext._listnext.datalist('refreshRow', index);
					} else { // Xóa dòng khi click dup
						mt.c_listnext._listnext.datalist('deleteRow', index);
					}
				}
			});
		},

		push: function(stt, name) {

			// Case current music
			if (stt == mt.musicCurId) {
				mt.c_loop.set(mt.c_loop.get() + 1);
				return;
			}

			// Case in list
			let list = this._listnext.datalist('getRows');
			let found = false;

			for (let i in list) {
				if (stt != list[i].stt)
					continue;
				
				list[i].loop++;

				if (list[i].loop == 1) {
					list[i].name += " (1)";
				} else {
					let pos = list[i].name.lastIndexOf("(");
					list[i].name = list[i].name.substring(0, pos + 1) + list[i].loop + ")";
				}

				mt.c_listnext._listnext.datalist('refreshRow', i);

				found = true;
				break;
			}

			if (!found) {
				this._listnext.datalist('appendRow', { stt: stt, name: name, loop: 0 });
			}
		},

		pop: function() {
			let row = this._listnext.datalist('getSelected');
			if (row != null)
			{
				let stt = this._listnext.datalist('getRowIndex', row);
				this._listnext.datalist('deleteRow', stt);
				return stt;
			}
			else
			{
				let stt = this._listnext.datalist('getRowIndex');
				if (stt == -1)
					return null;

				this._listnext.datalist('selectRow', 0);
				let row = this._listnext.datalist('getSelected');
				this._listnext.datalist('deleteRow', 0);
				return row;
			}
		},

		removeDupClick: function() {
			let size = this._listnext.datalist('getRows').length;
			this._listnext.datalist('deleteRow', size - 1);
		}

	},

	c_list: {
		component: null,
		toolbar: {
			edit: function() {

				// Kiểm tra quyền
				if (!mt.authorize) {
					alert("Access denied");
					return;
				}

				// Bỏ qua nếu đang chỉnh sửa
				if (mt.isEdit)
					return;

				// Bỏ qua nếu chưa chọn bài
				if (mt.musicCurId == -1) {
					alert("Chưa chọn bài");
					return;
				}

				// Tạm ngưng nhạc nếu đang phát
				if (mt.isPlay)
					mt.c_pause.onClick();

				// Bật chế độ chỉnh sửa
				mt.c_list.component.datagrid('beginEdit', mt.musicCurId);
				mt.c_list.rowAction.init();

				// Thay đổi giá trị
				mt.isEdit = true;
			},
			remove: function() {

				// Kiểm tra quyền
				if (!mt.authorize) {
					alert("Access denied");
					return;
				}

				// Bỏ qua nếu đang chỉnh sửa
				if (mt.isEdit)
					return;

				// Bỏ qua nếu chưa chọn bài
				if (mt.musicCurId == -1) {
					alert("Chưa chọn bài");
					return;
				}

				// Tạm ngưng nhạc nếu đang phát
				if (mt.isPlay)
					mt.c_pause.onClick();

				// Xác nhận xóa
				$.messager.confirm('Confirm','Are you sure you want to remove music?', function(r) {
					if (r) {
						$.ajax({
							type: 'DELETE',
							url: '/music/remove',
							data: { id: mt.c_list.component.datagrid('getSelected').id },
							success: function(res) { mt.c_list.reload(); },
							error: function(e) { alert('Fail: '+e); }
						});
					}
				});
			},
			cut: function() {
				
				// Kiểm tra quyền
				if (!mt.authorize) {
					alert("Access denied");
					return;
				}

				// Bỏ qua nếu đang chỉnh sửa
				if (mt.isEdit)
					return;

				// Bỏ qua nếu chưa chọn bài
				if (mt.musicCurId == -1) {
					alert("Chưa chọn bài");
					return;
				}

				// Tạm ngưng nhạc nếu đang phát
				if (mt.isPlay)
					mt.c_pause.onClick();

				// Hiển thị cut option
				mt.cut.toogleShow();
				
			}
		},
		rowAction: {

			init: function() {
				let dg = mt.c_list.component;
				dg.datagrid('showColumn', 'action');
				let mID = dg.datagrid('getSelected').id;

				let idPrt = 'action' + mID;
				let idSave = 'actionY' + mID;
				let idUndo = 'actionN' + mID;

				$('#'+idPrt).html('<a href="#" id="'+idSave+'"></a><a href="#" id="'+idUndo+'"></a>');
				$('#'+idSave).linkbutton({iconCls:'icon-save', plain:true});
				$('#'+idSave).click(mt.c_list.rowAction.save);
				$('#'+idUndo).linkbutton({iconCls:'icon-undo', plain:true});
				$('#'+idUndo).click(mt.c_list.rowAction.undo);
			},

			del: function() {
				if (!mt.isEdit)
					return;

				let mID = dg.datagrid('getSelected').id;

				$('#action'+mID).html('');
				mt.c_list.component.datagrid('hideColumn', 'action');
			},

			save: function() {
				if (!mt.isEdit)
					return;

				// Datagrid component
				let dg = mt.c_list.component;

				// End edit
				dg.datagrid('endEdit', mt.musicCurId);
				dg.datagrid('hideColumn', 'action');

				// Prepare data
				let data = dg.datagrid('getSelected');
				data.duration = mt.duration;

				// Save API
				$.ajax({
					type: 'POST',
					url: '/music/edit',
					data: data,
					success: function(res) { mt.c_list.reload(); },
					error: function(e) { alert('Fail: '+e); }
				});

				// Reset value
				mt.musicCurId = -1;
				mt.isEdit = false;
			},

			undo: function() {
				if (!mt.isEdit)
					return;

				// // Del button row
				// anime.rowAction.del();

				// Cancel edit
				let dg = mt.c_list.component;
				dg.datagrid('cancelEdit', mt.musicCurId);
				dg.datagrid('hideColumn', 'action');

				// // Handler
				// if (anime.rowID == 0)
				// 	anime.c_datagrid.component.datagrid('deleteRow', 0);

				// Reset value
				mt.musicCurId = -1;
				mt.isEdit = false;
			}
		},
		init: function() {

			// Component
			this.component = $("#list");

			this.initDatagrid();
		},
		initDatagrid: function() {

			// Thêm editor loại tagbox
			if ($.fn.datagrid.defaults.editors.tagbox == undefined) {
				$.extend($.fn.datagrid.defaults.editors, {
					tagbox: {
						init: function(container,options){
							let input = $('<input>').appendTo(container);
							input.tagbox(options);
							return input;
						},
						destroy: function(target){
							$(target).tagbox('destroy');
						},
						getValue: function(target){
							return $(target).tagbox('getValues').join(',');
						},
						setValue: function(target, value){
							if (value){
								$(target).tagbox('setValues', value.split(','));
							} else {
								$(target).tagbox('clear');
							}
						},
						resize: function(target, width){
							$(target).tagbox('resize', width);
						}
					}
				});
			}

			this.component.datagrid({
				data: this.getData(),
				toolbar: '#toolbar',
				fitColumns: true,
				rownumbers: true,
				singleSelect: true,
				autoRowHeight:false,
				pageSize: 50,
				height: 610,
				columns:[[
					{field:'name', title:'Name', sortable:false, resizable:true, align:'left', editor:'textbox',
						formatter:function(value, row, index) { return value; }},
					{field:'duration', title:'Duration', width:'64px', sortable:false, resizable:false, align:'center',
						formatter:function(v,r,i) {
							let duration = (v == null ? '' : mt.util.cov_time(v));
							return '<span id="duration'+r.id+'">'+duration+'</span>';
						}},
					{field:'tag', title:'Tag', sortable:false, resizable:true, align:'left', editor:'tagbox'},
					{field:'decibel', title:'Decibel', width:'64px', sortable:false, resizable:false, align:'center',
						editor:{ type:'numberbox', options:{ min:0, suffix:'%'}},
						formatter: function(v,r,i) { return v+'%' }},
					{field:'rate', title:'Rate', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:0px"></span>';
					}},
					{field:'action', title:'', width:70, hidden:true, formatter:function(v, r, i) {
						return '<div id="action'+r.id+'"></div>';
					}}
				]],
				onClickRow: function(index,row) {
					if (mt.isEdit) {
						// Neu dang edit, ko cho chon row khac
						mt.c_list.component.datagrid('selectRow', mt.musicCurId);
						return false;
					}

					mt.c_listnext.push(index, row.name);
					
					mt.c_list.component.datagrid('unselectRow', index);
					// mt.c_list.component.datagrid('selectRow', mt.musicCurId);

					mt.effect.soundClick.play();

					return false;
				},
				onDblClickRow: function(index,row) {
					if (mt.isEdit) {
						// Neu dang edit, ko cho chon row khac
						mt.c_list.component.datagrid('selectRow', mt.musicCurId);
						return false;
					}
					mt.handler.changeMusic(index, "mt.c_list.dupClickRow");
					mt.c_listnext.removeDupClick();
				}
			});
		},
		getData: function() {

			let inc = mt.c_tabInclude.get();
			let exc = mt.c_tabExclude.get();

			// Tải dữ liệu về
			let res = $.ajax({
				type: 'POST',
				url: '/music/getListMusic',
				data: {
					include: inc,
					exclude: exc
				},
				async: false
			}).responseJSON;

			// Lưu toàn cục
			mt.musics = res.rows;

			// Kết quả
			return res;
		},
		showDuration: function(durationStr) {
			let mID = mt.c_list.component.datagrid('getSelected').id;
			$('#duration'+mID).html(durationStr);
		},
		reload: function() {
			let newData = this.getData();
			this.component.datagrid('loadData', newData);

			// Remove list next
			while (mt.c_listnext._listnext.datalist('getRowIndex') == 0) {
				mt.c_listnext._listnext.datalist('deleteRow', 0);
			}
		},
		scrollToCur: function() {
			mt.c_list.component.datagrid('scrollTo', mt.musicCurId);
		}
	},

	c_drawer: {
		component: null,
		lstMusicNew: [],
		c_list: {
			component: null,
			init: function() {
				let c = $('#list_new');
				this.component = c;
				c.datagrid({
					data: [{name:'empty'}],
					toolbar: '#toolbar_new',
					rownumbers: true,
					columns:[[
						{field:'name', title:'Name', width:630},
						{field:'action', title:'', width:70, formatter: function(v,r,i) {
							if (r.name == "empty") return '';
							return '<a href="#" class="newOK" onclick="mt.c_drawer.c_list.newOK('+i+')"></a> \
									<a href="#" class="newNO" onclick="mt.c_drawer.c_list.newNO('+i+')"></a>';
						}}
					]],
					onLoadSuccess: function() {
						$('.newOK').linkbutton({ iconCls:'icon-ok', plain:true });
						$('.newNO').linkbutton({ iconCls:'icon-no', plain:true });

						$(this).datagrid('loaded');
					}
				});
			},
			newOK: function(index) {
				$.ajax({
					type: 'POST',
					url: '/music/add',
					data: mt.c_drawer.lstMusicNew[index],
					success: function(res) {
						let lst = mt.c_drawer.lstMusicNew;
						lst.splice(index, 1);
						mt.c_drawer.c_list.component.datagrid('loadData', lst);
						mt.c_list.component.datagrid('reload');
					}
				});
			},
			newNO: function(index) {
				let lst = mt.c_drawer.lstMusicNew;
				lst.splice(index, 1);
				this.component.datagrid('loadData', lst);
			}
		},
		init: function() {
			let c = $('#drawer');
			this.component = c;
			c.drawer({
				width: 750,
				region:'east',
				onCollapse: this.onCollapse
			});
		},
		open: function() {
			if (!mt.authorize) {
				alert("Access denied");
				return;
			}

			// Init component
			this.c_list.init();

			// Open list new
			this.component.drawer('expand');

			// Auto refresh on open
			this.refresh();
		},
		refresh: function() {
			this.c_list.component.datagrid('loading');
			$.ajax({
				type: 'POST',
				url: '/music/refresh',
				data: {},
				success: function(res) {
					mt.c_drawer.lstMusicNew = JSON.parse(res);
					mt.c_drawer.c_list.component.datagrid('loadData', mt.c_drawer.lstMusicNew);
				}
			});
		},
		onCollapse: function() {
			mt.c_list.reload();
		}
	},

	// Handler

	set_authorize: function() {
		$.ajax({
			type: 'POST',
			url: '/authorize',
			data: {},
			success: function(res) {
				mt.authorize = (res == 'true');
			}
		});
	},

	cut: {
		_cutDiv: null,
		active: false,
		isTest: false,

		init: function() {

			this._cutDiv = $('#cutDiv');

			this.c_slider.init();
			this.c_start.init();
			this.c_end.init();
			this.active = true;
		},

		c_slider: {
			component: null,

			init: function() {
				let c = $('#cutSlider');
				this.component = c;
				c.slider({
					width: '100%',
					range: true,
					value: [0,100],
					onChange: mt.cut.c_slider.onChange
				});
			},

			onChange: function(newValue, oldValue) {
				mt.cut.c_start.set(newValue[0]);
				mt.cut.c_end.set(newValue[1]);
			},

			setRange: function(maxValue) {
				this.component.slider({max:maxValue, value: [0, maxValue]});
				mt.cut.c_start.set(0);
				mt.cut.c_end.set(maxValue);
			}

		},

		c_start: {
			component: null,
			
			init: function() {
				this.component = $('#cutStart');
			},

			get: function() {
				return this.component.numberbox('getValue');
			},
			set: function(value) {
				this.component.numberbox('setValue',value);
			}
		},

		c_end: {
			component: null,
			
			init: function() {
				this.component = $('#cutEnd');
			},

			get: function() {
				return this.component.numberbox('getValue');
			},
			set: function(value) {
				this.component.numberbox('setValue',value);
			}
		},

		onChangeMusic: function() {
			if (!this.active)
				return;
			
			this.c_slider.setRange(mt.duration);
		},

		onUpdate: function(time) {
			if (!this.active || !this.isTest)
				return;
			
			if (time > this.c_end.get()) {
				mt.c_player.pause(true);
				this.isTest = false;
			}
		},

		onPlayerEnd: function() {
			if (this.active && this.isTest) {
				this.isTest = false;
				return false;
			}

			return true;
		},
		
		play: function() {
			this.isTest = true;
			mt.c_player.changeTime(this.c_start.get());
			mt.c_player.pause(false);
		},

		save: function() {
		
			// Xác nhận lưu
			$.messager.confirm('Confirm','Are you want to cut this music to track?', function(r) {
				if (r) {
					$.ajax({
						type: 'POST',
						url: '/music/cut',
						data: {
							id: mt.c_list.component.datagrid('getSelected').id
						},
						//success: function(res) { mt.c_list.reload(); },
						//error: function(e) { alert('Fail: '+e); }
					});
				}
			});
		},

		toogleShow: function() {
			if (this._cutDiv.is(":visible"))
				this._cutDiv.hide();
			else
				this._cutDiv.show();
		}

	}
}
