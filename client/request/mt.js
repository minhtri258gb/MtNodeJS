var mt = {

	tabs: {
		c: null,

		init: function() {
			// this.c = $('tabs');

			$('#tabs').tabs({
				border: false,
				onSelect: function(title) {
					if (title == '+') {
						alert(title+' is selected');
					}
				}
			});

			$('#tabs').tabs('add',{
				title: '+',
				content:'',
				closable: false,
			});

			// Thêm 1 tab
			// this.add();
		},

		add: function() {
			this.c.tabs('add', {
				title:'Anime',
				href: '/manager/anime',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
		}
	},

	init: function() {
		this.tabs.init();
	},

	sendRequest() {
		alert("aasd");
	},

}