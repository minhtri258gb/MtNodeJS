var mt = {

	dev: function() {

		mt.url.setType("GET");
		mt.url.set('https://baconipsum.com/json-api/');
		// mt.url.set('https://baconipsum.com/api/?type=meat-and-filler');
		// mt.url.set('https://opentdb.com/api.php?amount=1&category=18');
		// mt.url.set('https://api.gofile.io/getServer');

		// mt.url.setType("GET");
		// mt.url.set('https://reqres.in/api/users?page=2');

		// mt.url.setType("GET");
		// mt.url.set('https://reqres.in/api/users/2');

		// mt.url.setType("GET");
		// mt.url.set('https://reqres.in/api/users/23');

// get
// /api/unknown

// get
// /api/unknown/2

// get
// /api/unknown/23

		// mt.url.setType("POST");
		// mt.url.set('https://reqres.in/api/users');

// put
// /api/users/2

// patch
// /api/users/2

// delete
// /api/users/2

		// mt.url.setType("POST");
		// mt.url.set('https://reqres.in/api/register');
		// mt.url.set('https://reqres.in/api/register?userId=23&isRequest=true&name=abcdef');
		// mt.body.setType("Json");
		// mt.body.set('{ \
		// 	"email": "eve.holt@reqres.in", \
		// 	"password": "pistol" \
		// }');

// post
// /api/register
// {
// 	"email": "sydney@fife"
// }

// post
// /api/login
// {
// 	"email": "eve.holt@reqres.in",
// 	"password": "cityslicka"
// }

// post
// /api/login
// {
// 	"email": "peter@klaven"
// }

// get
// /api/users?delay=3



	},

	init: function() {
		this.url.init();
		this.params.init();
		this.header.init();
		this.authorize.init();
		this.body.init();
		this.response.init();

		this.dev();
	},

	gui: {

		unSelect: function(title,index) {
			if (index == 0) mt.params.endEditing();
			else if (index == 1) mt.header.endEditing();
		}

	},

	url: {

		_cbb: null,
		_txt: null,

		init: function() {

			this._cbb = $('#type_request');
			this._cbb.combobox({
				valueField: "data",
				textField: "data",
				data: [
					{data:"GET"},
					{data:"POST", selected: true},
					{data:"PATCH"},
					{data:"PUT"},
					{data:"DELETE"},
				],
				panelHeight: 162,
			});

			this._txt = $('#url');
			this._txt.textbox({
				onChange: (newValue, oldValue) => {
					let pos = newValue.indexOf('?');
					if (pos >= 0) {
						mt.params.setParams(newValue.substring(pos+1, newValue.length));
						this.set(newValue.substring(0, pos));
					}
				},
			});
		},

		request: () => {
			let self = mt.url;

			let xhr = new XMLHttpRequest();

			// Event
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4 && xhr.status == 200) {
					let responseType = xhr.getResponseHeader('content-type');
					if (responseType.includes('application/json')) {
						mt.response.set(xhr.response, 'json');
					} else if (responseType.includes('text/html')) {
						mt.response.set(xhr.response, 'html');
					} else {
						console.log(responseType);
					}
				}
			};
			/* #TODO error
			
			mt.response.showAction(false);
			if (xhr.status == 404) {
				let p = mt.url.utl_htmlErr("[404] Không tìm thấy API");
				mt.response.set(p);
			} else if (xhr.status == 400) {
				let p = mt.url.utl_htmlErr("[400] " + xhr.responseJSON.error);
				mt.response.set(p);
			} else {
				console.log("xhr:", xhr);
				console.log("ajaxOptions:", ajaxOptions);
				console.log("thrownError:", thrownError);
			}
			 */

			// URL
			let method = mt.url.getType();
			let fullurl = mt.url.get() + mt.params.get();
			xhr.open(method, fullurl, true);

			// Add header
			let headers = mt.header.get();
			for (let i in headers) {
				xhr.setRequestHeader(headers[i].name, headers[i].value);
			}

			// CORS
			// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			// xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    	// xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

			// Body
			let body = null;
			if (method == 'POST')
				body = mt.body.get();
			
			// Call
			xhr.send(body);
		},

		get: function() {
			return this._txt.textbox('getText');
		},

		set: function(value) {
			this._txt.textbox('setText', value);
		},

		getType: function() {
			return this._cbb.combobox('getText');
		},

		setType: function(value) {
			this._cbb.combobox('setValue', value);
		},

		utl_htmlErr: function(msg) {
			let p = $(document.createElement("p"));
			p.css({color: 'red'});
			p.html(msg);
			return p;
		},

	},

	params: {
		
		_dg: null,
		editIndex: undefined,

		init: function() {
			this._dg = $('#params');
			this._dg.datagrid({
				data: [],
				columns: [[
					{field:'name',title:'Name',width:228,sortable:true,editor:{type:'textbox',}},
					{field:'value',title:'Value',width:523,resizable:false,editor:{type:'textbox',}},
					{ field: 'action',
						title: '<a onclick="mt.params.add_param();"><span style="cursorointer"><img title="Thêm mới" src="/res/icons/add.png"/></span></a>',
						width: 25,
						resizable: false,
						formatter : function(val, row, index) {
					    return '<a onclick="mt.params.remove_param('+index+');"><img src="/res/icons/remove.png"/></a>';
						}
					},
				]],
				scrollbarSize: 0,
				checkOnSelect: false,
				selectOnCheck: false,
				singleSelect: true,
				onClickCell: this.onClickCell,
				onSelect: this.onSelect,
			});
		},

		add_param: function(_name = '', _value = '') {

			// Nếu đang edit thì lưu lại trước
			if (this.editIndex != undefined) {
				this.endEditing();
			}

			// Thêm dòng mới
			let data = this._dg.datagrid('getData').rows;
			data.push({name:_name, value:_value});
			this._dg.datagrid('loadData', data);
			this._dg.datagrid('checkRow', data.length-1);
		},

		remove_param: function(index) {

			// Nếu đang edit thì lưu lại trước
			if (this.editIndex != undefined) {
				this.endEditing();
			}

			// Xoá dòng đã chọn
			let data = this._dg.datagrid('getData').rows;
			data.splice(index, 1);
			this._dg.datagrid('loadData', data);
		},

		onSelect: (index, row) => {
			let self = mt.header;
			self._dg.datagrid('unselectRow', index);
		},

		onClickCell: (index, field) => {
			let self = mt.params;
			if (self.editIndex != index) {
				if (self.endEditing()) {
					self._dg.datagrid('selectRow', index).datagrid('beginEdit', index);
					let ed = self._dg.datagrid('getEditor', {index:index,field:field});
					if (ed) {
						($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
					}
					self.editIndex = index;
				} else {
					setTimeout(function() {
						self._dg.datagrid('selectRow', self.editIndex);
					},0);
				}
			}
		},

		endEditing: function() {
			if (this.editIndex == undefined)
				return true;
			
			if (this._dg.datagrid('validateRow', this.editIndex)) {
				this._dg.datagrid('endEdit', this.editIndex);
				this.editIndex = undefined;
				return true;
			}
			else
				return false;
		},

		setParams: function(paramsStr) {
			let arr = paramsStr.split('&');
			for (let i in arr) {
				if (arr[i].indexOf('=') >= 0) {
					let pair = arr[i].split('=');
					this.add_param(pair[0], pair[1]);
				}
			}
		},

		get: function() {
			let data = this._dg.datagrid('getData').rows;
			let paramStr = ''
			for (let i in data) {
				// escape()
				// encodeURI()
				// encodeURIComponent()
				paramStr = paramStr + '&' + data[i].name + '=' + data[i].value;
			}
			paramStr[0] = '?';
			return paramStr;
		},

	},

	header: {

		_dg: null, // Data grid
		editIndex: undefined,

		init: function() {
			this._dg = $('#header');
			this._dg.datagrid({
				data: [],
				columns: [[
					{field:'toogle',title:'',width:100,sortable:true,checkbox:true},
					{ field:'name',title:'Name',width:200,sortable:true,
						editor:{
							type:'combobox',
							options:{
								valueField:'data',
								textField:'data',
								data:[
									{data:'Accept'},
									{data:'Accept-Charset'},
									{data:'Access-Control-Allow-Origin'},
									{data:'Accept-Encoding'},
									{data:'Accept-Language'},
									{data:'Authorization'},
									{data:'Cache-Control'},
									{data:'Connection'},
									{data:'Content-Length'},
									{data:'Content-Type'},
									{data:'Cookie'},
									{data:'Date'},
									{data:'Expect'},
									{data:'From'},
									{data:'Host'},
									{data:'If-Match'},
									{data:'If-Modified-Since'},
									{data:'If-None-Match'},
									{data:'If-Range'},
									{data:'If-Unmodified-Since'},
									{data:'Max-Forwards'},
									{data:'Pragma'},
									{data:'Proxy-Authorization'},
									{data:'Range'},
									{data:'Referer'},
									{data:'TE'},
									{data:'Upgrade'},
									{data:'User-Agent'},
									{data:'Via'},
									{data:'Warning'},
								],
								required:true,
							}
						}
					},
					{ field:'value',title:'Value',width:523,resizable:false,
						editor:{
							type:'textbox',
						}
					},
					{ field: 'action',
						title: '<a onclick="mt.header.add_header();"><span style="cursorointer"><img title="Thêm mới" src="/res/icons/add.png"/></span></a>',
						width: 25,
						resizable: false,
						formatter : function(val, row, index) {
					    return '<a onclick="mt.header.remove_header('+index+');"><img src="/res/icons/remove.png"/></a>';
						}
					},
				]],
				scrollbarSize: 0,
				checkOnSelect: false,
				selectOnCheck: false,
				singleSelect: true,
				onClickCell: this.onClickCell,
				onSelect: this.onSelect,
			});
		},

		add_header: function(_name = '', _value = '') {

			// Nếu đang edit thì lưu lại trước
			if (this.editIndex != undefined) {
				this.endEditing();
			}

			// Thêm dòng mới
			let data = this._dg.datagrid('getData').rows;
			data.push({name:_name, value:_value});
			this._dg.datagrid('loadData', data);
			this._dg.datagrid('checkAll');
		},

		edit_header: function(_name = '', _value = '') {

			// Nếu đang edit thì lưu lại trước
			if (this.editIndex != undefined) {
				this.endEditing();
			}

			// Tìm key
			let data = this._dg.datagrid('getData').rows;
			let found = -1;
			for (let i=0; i<data.length; i++) {
				if (data[i].name == _name) {
					found = i;
					break;
				}
			}

			if (found >= 0) {
				if (_value == 'empty')
					data.splice(found, 1); // Xoá header nếu value là empty
				else
					data[found].value = _value;
			} else {
				if (_value != 'empty')
					data.push({name:_name, value:_value});
			}
			
			this._dg.datagrid('loadData', data);
			this._dg.datagrid('checkAll');
		},

		remove_header: function(index) {
			
			// Nếu đang edit thì lưu lại trước
			if (this.editIndex != undefined)
				if (!this.endEditing())
					return;

			// Xoá dòng đã chọn
			this._dg.datagrid('deleteRow', index);
			// this._dg.datagrid('checkAll');
		},

		onSelect: (index, row) => {
			let self = mt.header;
			self._dg.datagrid('unselectRow', index);
		},

		onClickCell: (index, field) => {
			let self = mt.header;
			if (self.editIndex != index) {
				if (self.endEditing()) {
					self._dg.datagrid('selectRow', index).datagrid('beginEdit', index);
					let ed = self._dg.datagrid('getEditor', {index:index,field:field});
					if (ed) {
						($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
					}
					self.editIndex = index;
				} else {
					setTimeout(function() {
						self._dg.datagrid('selectRow', self.editIndex);
					},0);
				}
			}
		},

		endEditing: function() {
			if (this.editIndex == undefined)
				return true;
			
			if (this._dg.datagrid('validateRow', this.editIndex)) {
				this._dg.datagrid('endEdit', this.editIndex);
				this.editIndex = undefined;
				return true;
			}
			else
				return false;
		},

		get: function(isAll = false) {
			if (isAll) {
				return this._dg.datagrid('getData').rows;
			} else {
				return this._dg.datagrid('getChecked');
			}
		},

	},

	body: {

		_cbb: null, // Type
		_txt: null, // Body content

		init: function() {
			this._txt = $('#body');
			this._txt.textbox({
				height: 500,
				multiline: true,
			});

			this._cbb = $('#type_body');
			this._cbb.combobox({
				valueField: "data",
				textField: "data",
				data: [
					{data:"Raw", selected: true},
					{data:"Json"},
					{data:"XML"},
					{data:"HTML"},
					{data:"CSS"},
					{data:"File"},
				],
				panelHeight: 195,
				onChange: (newValue, oldValue) => {
					let value = '';
					if (newValue == 'Raw')
						value = 'empty'
					else if (newValue == 'Json')
						value = 'application/json'

					if (value.length > 0)
						mt.header.edit_header('Content-Type', value);
				},
			});

		},

		get: function() {
			return this._txt.textbox('getText');
		},

		set: function(value) {
			this._txt.textbox('setText', JSON.stringify(JSON.parse(value),null,2));
		},

		getType: function() {
			return this._cbb.combobox('getText');
		},

		setType: function(value) {
			this._cbb.combobox('setValue', value);
		},

	},

	authorize: {
		
		_cbb: null, // Type
		_tk: null, // Access Token

		// _txtToken: null,

		init: function() {
			
			this._cbb = $('#type_authorize');
			this._cbb.combobox({
				valueField: "data",
				textField: "data",
				data: [
					{data:"Basic"},
					{data:"Bearer", selected: true},
					{data:"NTLM"},
					{data:"OAuth 2"},
					{data:"Open id"},
					{data:"Client certificate"},
				],
				panelHeight: 195,
			});

			this._tk = $('#access_token');
			this._tk.textbox({
				label: 'Access Token',
				labelWidth: 85,
				iconCls:'icon-key',
				iconAlign:'left',
				onChange: (newValue,oldValue) => {
					mt.header.edit_header('Authorization', 'Bearer ' + newValue);
				},
			});

			
					// #TODO check type
					// 	"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
		},

	},

	response: {

		_div: null,
		_action: null,
		response: "",
		_treeJson: null,
		
		init: function() {
			this._div = $('#response');
			this._action = $('#btn_copy');
		},

		get: function() {
			return this._div.html();
		},

		set: function(value, type) {
			
			// Hide and Show
			if (value != null && value != "")
				this._div.show();
			else
				this._div.hide();

			// Show response
			if (type == 'json') {

				// Xoá tree cũ
				if (this._treeJson) {
					jsonview.destroy(this._treeJson);
				}

				// Reset html
				this._div.html('');

				this._treeJson = jsonview.create(value);
				jsonview.render(this._treeJson, document.querySelector('#response'));
				jsonview.expand(this._treeJson);

			} else if (type == 'html') {

				let iframe = document.createElement("iframe");
				iframe.id = 'iframe';
				// iframe.scrolling="no";
				iframe.frameborder = "0";
				iframe.style = "position: relative; height: 100%; width: 100%;";
				iframe.onload = () => {
					iframe.style.height = 0;
					iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
				};
				iframe.srcdoc = value;
				this._div.html(iframe);

			} else {
				this._div.html(value);
			}

		},

		showAction: function(toogle) {
			if (toogle)
				this._action.show();
			else
				this._action.hide();
		},

	},

};