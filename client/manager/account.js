var account = {

	postfix: '_account',

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
			this.component = $('#datagrid'+account.postfix);
			this.initDataGrid();
		},
		initDataGrid: function() {
			this.component.datagrid({
				url: '/manager/account/search',
				toolbar: '#toolbar'+account.postfix,
				rownumbers: true,
				singleSelect: true,
				pagination: true,
				pageSize: 10,
				columns: [[
					{field:'server', title:'Server', editor:{type:'textbox'}},
					{field:'username', title:'Username', editor:{type:'textbox'}},
					{field:'password', title:'Password', editor: {type:'textbox'}},
					{field:'hint', title:'Hint', editor:{type:'textbox'}},
					{field:'action', title:'', width:70, hidden:true, formatter:function(v, r, i) {
						return '<div id="action'+r.id+account.postfix+'"></div>';
					}}
				]],
				onLoadSuccess: function(data) {

				},
				onDblClickRow: function(index,row) {
					account.toolbar.edit();
				},
				onClickRow: function(index,row) {
					if (account.rowID != -1) {
						// Neu dang edit, ko cho chon row khac
						$(this).datagrid('unselectRow',index).datagrid('selectRow', account.rowSel);
						return;
					}
					account.rowSel = index;
				}
			});
		},
		search: function(text) {
			this.component.datagrid('reload', {text:text});
		}
	},

	toolbar: {
		add: function() {
			if (account.rowID > -1)
				return;

				account.rowID = 0;
				account.rowSel = 0;
			let dg = account.c_datagrid.component;
			dg.datagrid('insertRow', {index: 0, row: {id:0}} );
			dg.datagrid('selectRow', 0).datagrid('beginEdit', 0);
			account.rowAction.init();
		},
		edit: function() {
			if (account.rowID > -1)
				return;
			if (account.rowSel == -1)
				return;

			let dg = account.c_datagrid.component;
			account.rowID = dg.datagrid('getSelected').id;
			dg.datagrid('beginEdit', account.rowSel);
			account.rowAction.init();
		},
		search: function(text) {
			account.c_datagrid.search(text);
		}
	},

	rowAction: {

		init: function() {
			account.c_datagrid.component.datagrid('showColumn', 'action');

			let idPrt = 'action' + account.rowID + account.postfix;
			let idSave = 'actionY' + account.rowID + account.postfix;
			let idUndo = 'actionN' + account.rowID + account.postfix;

			$('#'+idPrt).html('<a href="#" id="'+idSave+'"></a><a href="#" id="'+idUndo+'"></a>');
			$('#'+idSave).linkbutton({iconCls:'icon-save', plain:true});
			$('#'+idSave).click(account.rowAction.save);
			$('#'+idUndo).linkbutton({iconCls:'icon-undo', plain:true});
			$('#'+idUndo).click(account.rowAction.undo);
		},

		del: function() {
			
			if (account.rowID == -1)
				return;
			
			$('#action'+account.rowID+account.postfix).html('');
			account.c_datagrid.component.datagrid('hideColumn', 'action');
		},

		save: function() {
			if (account.rowID == -1)
				return;

			// Datagrid component
			let dg = account.c_datagrid.component;

			// End edit
			dg.datagrid('endEdit', account.rowSel);

			// Prepare data
			let data = dg.datagrid('getSelected');

			// Save API
			$.ajax({
				type: 'POST',
				url: '/manager/account/save',
				data: {data: data},
				success: function(res) {
					account.c_datagrid.component.datagrid('reload');
				},
				error: function(e) {
					account.c_datagrid.component.datagrid('deleteRow', 0); // #TODO #FIX nếu chỉnh sửa lỗi sẽ xóa dòng 1
					alert('Fail: '+e);
				}
			});

			// Reset value
			account.rowID = -1;
			account.rowSel = -1;
		},

		undo: function() {
			if (account.rowID == -1)
				return;

			// Del button row
			account.rowAction.del();

			// Cancel edit
			account.c_datagrid.component.datagrid('cancelEdit', account.rowSel);

			// Handler
			if (account.rowID == 0)
				account.c_datagrid.component.datagrid('deleteRow', 0);

			// Reset value
			if (account.rowID == 0)
				account.rowSel = -1;
			account.rowID = -1;
		}

	},

};