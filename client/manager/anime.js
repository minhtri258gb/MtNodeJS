var anime = {

	rowID: -1,
	rowSel: -1,

	// Forward
	init: function() {
		this.c_datagrid.init();
	},

	// Component
	c_datagrid: {
		component: null,
		init: function() {
			this.component = $('#datagridAnime');
			this.initDataGrid();
		},
		initDataGrid: function() {

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
				url: '/manager/anime/search',
				toolbar: '#toolbarAnime',
				rownumbers: true,
				singleSelect: true,
				pagination: true,
				pageSize: 10,
				columns: [[
					{field:'name', title:'Name', sortable:true, editor:{type:'textbox'}},
					{field:'story', title:'Story', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'art', title:'Art', width:60, align:'center', sortable:true, editor: {type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'sound', title:'Sound', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'fantasy', title:'Fantasy', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'sad', title:'Sad', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'joke', title:'Joke', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'brand', title:'Brand', width:60, align:'center', sortable:true, editor:{type:'numberspinner', options:{min:1, max:5}}, formatter: function(v,r,i) {
						return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
					}},
					{field:'review', title:'Review', width:60, align:'center', sortable:true,
						formatter: function(v,r,i) {
							return '<span class="rating l-btn-icon icon-rating'+v+'" style="position:initial;margin-top:6px"></span>';
						},
						styler: function(v,r,i) { return 'background-color:#eff9ff;'; },
						editor:{type:'numberspinner', options:{min:1, max:5}}
					},
					{field:'end', title:'End', editor:{type:'textbox'}},
					{field:'character', title:'Character', editor:{type:'tagbox'}},
					{field:'updateTime', title:'Update', formatter:function(v, r, i) {
						return v;
					}},
					{field:'action', title:'', width:70, hidden:true, formatter:function(v, r, i) {
						return '<div id="action'+r.id+'"></div>';
					}}
				]],
				onLoadSuccess: function(data) {
				},
				onDblClickRow: function(index,row) {
					anime.toolbar.edit();
				},
				onClickRow: function(index,row) {
					if (anime.rowID != -1) {
						// Neu dang edit, ko cho chon row khac
						$(this).datagrid('unselectRow',index).datagrid('selectRow', anime.rowSel);
						return;
					}
					anime.rowSel = index;
				}
			});
		},
		search: function(text) {
			this.component.datagrid('reload', {text:text});
		}
	},

	toolbar: {
		add: function() {
			if (anime.rowID > -1)
				return;

			anime.rowID = 0;
			anime.rowSel = 0;
			let dg = anime.c_datagrid.component;
			dg.datagrid('insertRow', {index: 0, row: {id:0}} );
			dg.datagrid('selectRow', 0).datagrid('beginEdit', 0);
			anime.rowAction.init();
		},
		edit: function() {
			if (anime.rowID > -1)
				return;
			if (anime.rowSel == -1)
				return;

			let dg = anime.c_datagrid.component;
			anime.rowID = dg.datagrid('getSelected').id;
			dg.datagrid('beginEdit', anime.rowSel);
			anime.rowAction.init();
		},
		search: function(text) {
			anime.c_datagrid.search(text);
		}
	},

	rowAction: {

		init: function() {
			anime.c_datagrid.component.datagrid('showColumn', 'action');

			let idPrt = 'action' + anime.rowID;
			let idSave = 'actionY' + anime.rowID;
			let idUndo = 'actionN' + anime.rowID;

			$('#'+idPrt).html('<a href="#" id="'+idSave+'"></a><a href="#" id="'+idUndo+'"></a>');
			$('#'+idSave).linkbutton({iconCls:'icon-save', plain:true});
			$('#'+idSave).click(anime.rowAction.save);
			$('#'+idUndo).linkbutton({iconCls:'icon-undo', plain:true});
			$('#'+idUndo).click(anime.rowAction.undo);
		},

		del: function() {
			
			if (anime.rowID == -1)
				return;
			
			$('#action'+anime.rowID).html('');
			anime.c_datagrid.component.datagrid('hideColumn', 'action');
		},

		save: function() {
			if (anime.rowID == -1)
				return;

			// Datagrid component
			let dg = anime.c_datagrid.component;

			// End edit
			dg.datagrid('endEdit', anime.rowSel);

			// Prepare data
			let data = dg.datagrid('getSelected');

			// Save API
			$.ajax({
				type: 'POST',
				url: '/manager/anime/save',
				data: {data: data},
				success: function(res) {
					anime.c_datagrid.component.datagrid('reload');
				},
				error: function(e) {
					anime.c_datagrid.component.datagrid('deleteRow', 0); // #TODO #FIX nếu chỉnh sửa lỗi sẽ xóa dòng 1
					alert('Fail: '+e);
				}
			});

			// Reset value
			anime.rowID = -1;
			anime.rowSel = -1;
		},

		undo: function() {
			if (anime.rowID == -1)
				return;

			// Del button row
			anime.rowAction.del();

			// Cancel edit
			anime.c_datagrid.component.datagrid('cancelEdit', anime.rowSel);

			// Handler
			if (anime.rowID == 0)
				anime.c_datagrid.component.datagrid('deleteRow', 0);

			// Reset value
			if (anime.rowID == 0)
				anime.rowSel = -1;
			anime.rowID = -1;
		}

	},

};