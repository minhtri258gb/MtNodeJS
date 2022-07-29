/**
 * Volume lâu lâu set sai (max thanh)
**/
var music = {
	
	musics: [],
	musicCurId: -1,
	history: [],
	isPlay: false,
	isEdit: false,
	duration: 0,
	volume: 0.3,

	c_layout: {
		component: null,
		init: function() {
			let c = $('#layout');
			this.component = c;
			c.layout({ fit: true });
			c.layout('panel', 'center').panel('options').onResize = music.c_layout.onCenterResize;
		},
		changeLeftTitle: function(name) {
			this.component.layout('panel', 'west').panel({title: 'Name: ' + name});
		},
		onCenterResize: function(width, height) {
			let ops = music.c_layout.component.layout('panel', 'center').panel('options');
			music.c_list.component.datagrid({ width:ops.width - 12, height:ops.height - 48 });
		}
	},
	c_player: {
		component: null,
		init: function() {
			let c = $("#player");
			this.component = c;
			c.on("ended", music.c_player.onEnd);
			c.on("canplay", music.c_player.onCanPlay);
			c.on("timeupdate", music.c_player.onTimeUpdate);
		},
		changeMusic: function(index) {

			music.musicCurId = index;
			let name = music.musics[index].name;
			music.set_music_name(name);

			// Thiết lập volume
			music.c_volumeBar.setVolume(music.volume);

			let c = music.c_player.component;
			c.attr("src", '/music/getMusic?name='+name);
			c[0].pause();
			c[0].load();
			c[0].oncanplaythrough = c[0].play();

			music.isPlay = true;
			music.c_pause.switchIcon();
		},
		onEnd: function(event) {
			if (music.c_loop.pop())
				music.c_player.replay();
			else
				music.c_next.onClick();
		},
		onCanPlay: function() {
			// Progress Bar
			music.c_progressBar.begin();
			// List duration
			let durationStr = music.util.cov_time(music.duration);
			music.c_list.showDuration(durationStr);
		},
		onTimeUpdate: function () {
			music.c_progressBar.update(this.currentTime);
		},
		setVolume: function(n) {
			if (!isNaN(n)) {
				if (n > 1.0) n = 1.0;
				else if (n < 0.0) n = 0.0;
				music.c_player.component.prop("volume", n);
			}
		},
		replay: function() {
			let c = music.c_player.component;
			c[0].currentTime = 0;
			c[0].play();
		},
		pause: function() {
			let c = music.c_player.component;
			if (c[0].paused == false) {
				c[0].pause();
			} else {
				c[0].play();
			}
			music.isPlay = !c[0].paused;
		},
		changeTime: function(value) {
			let c = music.c_player.component;
			c.bind('canplay', function() {
				this.currentTime = value;
			});
		}
	},
	c_progressBar: {
		component: null,
		textPost: '',
		init: function() {
			let c = $('#progressBar');
			this.component = c;
			c.progressbar({
				value: 0,
				text: '0:00 / 0:00'
			});
		},
		begin: function() {
			music.duration = music.c_player.component[0].duration;
			this.textPost = ' / ' + music.util.cov_time(music.duration);
		},
		update: function(currentTime) {
			if (music.duration > 0) {
				this.component.progressbar({
					value: (currentTime / music.duration * 100.0),
					text: music.util.cov_time(currentTime) + this.textPost
				});
				// if (currentTime >= music.duration)
				// 	music.c_progressBar.end();
			}
		},
		end: function() {
			// music.c_player.changeTime(value);
		}
	},
	c_pause: {
		component: null,
		init: function() {
			let c = $("#btnPause");
			music.c_pause.component = c;
		},
		onClick: function() {
			if (music.musicCurId == -1) {
				music.c_next.onClick();
				return;
			}
			
			music.c_player.pause();
			music.c_pause.switchIcon();
		},
		switchIcon: function() {
			let c = music.c_pause.component;
			if (music.isPlay)
				c.linkbutton({ iconCls: 'icon-pause' });
			else
				c.linkbutton({ iconCls: 'icon-play' });
		}
	},
	c_next: {
		component: null,
		init: function() {
			let c = $("#btnNext");
			music.c_next.component = c;
		},
		onClick: function() {
			let i = 0;
			if (music.c_autoNext.value())
				i = Math.floor(Math.random() * music.musics.length);
			else {
				i = music.musicCurId + 1;
				if (i >= music.musics.length)
					i = 0;
			}
			
			if (music.musicCurId != -1)
				music.history.push(music.musicCurId);

			music.c_list.changeMusic(i);
		}
	},
	c_back: {
		component: null,
		init: function() {
			let c = $("#btnBack");
			music.c_next.component = c;
		},
		onClick: function() {
			if (music.history.length > 0)
				music.c_list.changeMusic(music.history.pop());
		}
	},
	c_volumeBar: {
		component: null,
		init: function() {
			let c = $('#volumeBar');
			music.c_volumeBar.component = c;
			c.slider({
				mode: 'v',
				height: '90px',
				value: music.volume,
				min: 0.0,
				max: 1.0,
				step: 0.02,
				onChange: music.c_volumeBar.onChange
			});
		},
		onChange: function(newValue, oldValue) {
			music.c_player.setVolume(newValue);
			music.c_btnVolume.update();
		},
		getVolume: function() {
			return this.component.slider('getValue');
		},
		setVolume: function(volume) {
			let offset = 100.0;
			if (music.musics.length > 0 && music.musicCurId > -1)
				offset = music.musics[music.musicCurId].decibel;
			if (offset == undefined)
				offset = 100.0;
			
			volume = volume * offset / 100.0;

			if (!isNaN(volume)) {
				if (volume > 1.0) volume = 1.0;
				else if (volume < 0.0) volume = 0.0;
			} else volume = 1.0;
			music.c_volumeBar.component.slider('setValue', volume);
		}
	},
	c_btnVolume: {
		component: null,
		status: 0,
		oldValue: 0,
		init: function() {
			let c = $('#btnVolume');
			this.component = c;
		},
		update: function() {
			let volume = music.c_volumeBar.getVolume();

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
			let curVolume = music.c_volumeBar.getVolume();

			if (curVolume == 0) {
				music.c_volumeBar.setVolume(this.oldValue);
			} else {
				this.oldValue = curVolume;
				music.c_volumeBar.setVolume(0.0);
			}
		}
	},
	c_autoNext: {
		component: null,
		init: function() {
			let c = $("#autoNext");
			music.c_autoNext.component = c;
		},
		value: function() {
			return music.c_autoNext.component.switchbutton('options').checked;
		}
	},
	c_loop: {
		component: null,
		init: function() {
			let c = $("#loop");
			music.c_loop.component = c;
		},
		pop: function() {
			let c = music.c_loop.component;
			let n = c.numberbox('getValue');
			if (n.length > 0 && n > 0) {
				c.numberbox('setValue', n-1);
				return true;
			}
			return false;
		}
	},
	c_tabInclude: {
		component: null,
		init: function() {
			let c = $('#tagInclude');
			music.c_tabInclude.component = c;
			c.tagbox({
				label: 'Include: ',
				onChange: music.c_tabInclude.onChange
			});
		},
		onChange: function(newValue, oldValue) {
			music.c_list.reload();
		},
		get: function() {
			return music.c_tabInclude.component.tagbox('getValues');
		}
	},
	c_tabExclude: {
		component: null,
		init: function() {
			let c = $('#tagExclude');
			music.c_tabExclude.component = c;
			c.tagbox({
				label: 'Exclude: ',
				value: 'less',
				onChange: music.c_tabExclude.onChange
			});
		},
		onChange: function(newValue, oldValue) {
			music.c_list.reload();
		},
		get: function() {
			return music.c_tabExclude.component.tagbox('getValues');
		}
	},
	c_list: {
		component: null,
		toolbar: {
			edit: function() {

				// Kiểm tra quyền
				if (!music.authorize) {
					alert("Access denied");
					return;
				}

				// Bỏ qua nếu đang chỉnh sửa
				if (music.isEdit)
					return;

				// Bỏ qua nếu chưa chọn bài
				if (music.musicCurId == -1) {
					alert("Chưa chọn bài");
					return;
				}

				// Tạm ngưng nhạc nếu đang phát
				if (music.isPlay)
					music.c_pause.onClick();
				
				// Bật chế độ chỉnh sửa
				let dg = music.c_list.component;
				dg.datagrid('beginEdit', music.musicCurId);
				music.c_list.rowAction.init();
				
				// Thay đổi giá trị
				music.isEdit = true;
			},
			remove: function() {
				
				// Kiểm tra quyền
				if (!music.authorize) {
					alert("Access denied");
					return;
				}

				// Bỏ qua nếu đang chỉnh sửa
				if (music.isEdit)
					return;

				// Bỏ qua nếu chưa chọn bài
				if (music.musicCurId == -1) {
					alert("Chưa chọn bài");
					return;
				}

				// Tạm ngưng nhạc nếu đang phát
				if (music.isPlay)
					music.c_pause.onClick();
				
				// Xác nhận xóa
				$.messager.confirm('Confirm','Are you sure you want to remove music?', function(r) {
					if (r) {
						$.ajax({
							type: 'DELETE',
							url: '/music/remove',
							data: { id: music.c_list.component.datagrid('getSelected').id },
							success: function(res) { music.c_list.reload(); },
							error: function(e) { alert('Fail: '+e); }
						});
					}
				});
			}
		},
		rowAction: {
				
			init: function() {
				let dg = music.c_list.component;
				dg.datagrid('showColumn', 'action');
				let mID = dg.datagrid('getSelected').id;
				
				let idPrt = 'action' + mID;
				let idSave = 'actionY' + mID;
				let idUndo = 'actionN' + mID;

				$('#'+idPrt).html('<a href="#" id="'+idSave+'"></a><a href="#" id="'+idUndo+'"></a>');
				$('#'+idSave).linkbutton({iconCls:'icon-save', plain:true});
				$('#'+idSave).click(music.c_list.rowAction.save);
				$('#'+idUndo).linkbutton({iconCls:'icon-undo', plain:true});
				$('#'+idUndo).click(music.c_list.rowAction.undo);
			},

			del: function() {
			
				if (!music.isEdit)
					return;
				
				let mID = dg.datagrid('getSelected').id;

				$('#action'+mID).html('');
				music.c_list.component.datagrid('hideColumn', 'action');
			},
	
			save: function() {
				if (!music.isEdit)
					return;
	
				// Datagrid component
				let dg = music.c_list.component;
	
				// End edit
				dg.datagrid('endEdit', music.musicCurId);
	
				// Prepare data
				let data = dg.datagrid('getSelected');
				data.duration = music.duration;

				// Save API
				$.ajax({
					type: 'POST',
					url: '/music/edit',
					data: data,
					success: function(res) { music.c_list.reload(); },
					error: function(e) { alert('Fail: '+e); }
				});
	
				// Reset value
				music.musicCurId = -1;
				music.isEdit = false;
			},
	
			undo: function() {
				if (!music.isEdit)
					return;
	
				// // Del button row
				// anime.rowAction.del();
	
				// // Cancel edit
				// anime.c_datagrid.component.datagrid('cancelEdit', anime.rowSel);
	
				// // Handler
				// if (anime.rowID == 0)
				// 	anime.c_datagrid.component.datagrid('deleteRow', 0);
	
				// Reset value
				music.musicCurId = -1;
				music.isEdit = false;
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

			music.c_list.component.datagrid({
				// url: '/music/getListMusic',
				data:music.c_list.getData(),
				toolbar:'#toolbar',
				fitColumns: true,
				rownumbers: true,
				singleSelect: true,
				autoRowHeight:false,
				pageSize:50,
				height:610,
				columns:[[
					{field:'name', title:'Name', sortable:false, resizable:true, align:'left', editor:'textbox',
						formatter:function(value, row, index) { return value; }},
					{field:'duration', title:'Duration', width:'64px', sortable:false, resizable:false, align:'center',
						formatter:function(v,r,i) {
							let duration = (v == null ? '' : music.util.cov_time(v));
							return '<span id="duration'+r.id+'">'+duration+'</span>';
						}},
					{field:'tag', title:'Tag', sortable:false, resizable:true, align:'left', editor:'tagbox'},
					{field:'decibel', title:'Decibel', width:'64px', sortable:false, resizable:false, align:'center',
						editor:{ type:'numberbox', options:{ min:0, suffix:'%'}},
						formatter: function(v,r,i) { return v+'%' }},
					{field:'action', title:'', width:70, hidden:true, formatter:function(v, r, i) {
						return '<div id="action'+r.id+'"></div>';
					}}
				]],
				onClickRow: function(index,row) {
					if (music.isEdit) {
						// Neu dang edit, ko cho chon row khac
						$(this).datagrid('unselectRow',index).datagrid('selectRow', music.musicCurId);
						return;
					}
					music.c_list.changeMusic(index, false);
				}
			});
		},
		getData: function() {

			let inc = music.c_tabInclude.get();
			let exc = music.c_tabExclude.get();
			
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
			music.musics = res.rows;

			// Kết quả
			return res;
		},
		changeMusic: function(index, selectRow = true) {
			if (selectRow) {
				setTimeout(() => { music.c_list.scrollToCur() }, 500);
				this.component.datagrid('selectRow', index);
			}
			music.c_player.changeMusic(index);
		},
		showDuration: function(durationStr) {
			let mID = music.c_list.component.datagrid('getSelected').id;
			$('#duration'+mID).html(durationStr);
		},
		reload: function() {
			let newData = this.getData();
			this.component.datagrid('loadData', newData);
		},
		scrollToCur: function() {
			music.c_list.component.datagrid('scrollTo', music.musicCurId);
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
							return '<a href="#" class="newOK" onclick="music.c_drawer.c_list.newOK('+i+')"></a> \
									<a href="#" class="newNO" onclick="music.c_drawer.c_list.newNO('+i+')"></a>';
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
					data: music.c_drawer.lstMusicNew[index],
					success: function(res) {
						let lst = music.c_drawer.lstMusicNew;
						lst.splice(index, 1);
						music.c_drawer.c_list.component.datagrid('loadData', lst);
						music.c_list.component.datagrid('reload');
					}
				});
			},
			newNO: function(index) {
				let lst = music.c_drawer.lstMusicNew;
				lst.splice(index, 1);
				this.component.datagrid('loadData', lst);
			}
		},
		init: function() {
			let c = $('#drawer');
			this.component = c;
			c.drawer({ width:750, region:'east' });
		},
		open: function() {
			if (!music.authorize) {
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
					music.c_drawer.lstMusicNew = JSON.parse(res);
					music.c_drawer.c_list.component.datagrid('loadData', music.c_drawer.lstMusicNew);
				}
			});
		}
	},

	init: function() {
		this.c_layout.init();
		this.c_player.init();
		this.c_progressBar.init();
		this.c_pause.init();
		this.c_next.init();
		this.c_back.init();
		this.c_volumeBar.init();
		this.c_btnVolume.init();
		this.c_autoNext.init();
		this.c_loop.init();
		this.c_tabInclude.init();
		this.c_tabExclude.init();
		this.c_list.init();
		this.c_drawer.init();

		this.event.init();

		this.util.init();

		// Set default
		this.set_authorize();
		this.c_volumeBar.setVolume(this.volume);
		this.c_btnVolume.update();
	},

	event: {
		init: function() {
			window.addEventListener('resize', this.resize);
			window.addEventListener('keyup', this.keyup);
			window.addEventListener('keydown', this.keydown);
			window.onfocus = this.onfocus;
		},
		resize: function(event) { },
		keydown: function(event) {
			let isAction = false;
			if (event.code === 'Space') {
				isAction = true;
				music.c_pause.onClick();
			} else if (event.code === 'Enter') {
				isAction = true;
				music.c_next.onClick();
			}
			if (isAction)
				event.preventDefault();
			return !isAction;
		},
		keyup: function(event) { },
		onfocus: function() {
			music.c_list.scrollToCur();
		}
	},

	util: {
		init: function() {
			
		},
		cov_time: function(value) {
			let valueR = Math.floor(value);
			let minute = Math.floor(valueR/60);
			let second = valueR%60;
			if (second < 10) second = '0'+second;
			return minute+':'+second;
		}
	},

	// Handler
	set_music_name: function(name) {

		document.title = name;

		this.c_layout.changeLeftTitle(name);
	},
	set_authorize: function() {
		$.ajax({
			type: 'POST',
			url: '/authorize',
			data: {},
			success: function(res) {
				music.authorize = (res == 'true');
			}
		});
	},
	do_pause: function() {
		this.c_pause.onClick();
	},
	do_next: function() {
		this.c_next.onClick();
	}
}
