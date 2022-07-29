var manager = {

	// Forward
	init: function() {
		this.c_tab.init();
	},

	// Component
	c_tab: {
		component: null,
		init: function() {
			this.component = $('#tab');
		},
		addAnime: function() {
			this.component.tabs('add', {
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
		},
		addFilm: function() {
			this.component.tabs('add', {
				title:'Film',
				href: '/manager/film',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
			$.getScript("/manager/film.js", function( data, textStatus, jqxhr ) { story.init(); });
		},
		addMovie: function() {
			this.component.tabs('add', {
				title:'Movie',
				href: '/manager/movie',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
			$.getScript("/manager/movie.js", function( data, textStatus, jqxhr ) { story.init(); });
		},
		addManga: function() {
			this.component.tabs('add', {
				title:'Manga',
				href: '/manager/manga',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
			$.getScript("/manager/manga.js", function( data, textStatus, jqxhr ) { story.init(); });
		},
		addGame: function() {
			this.component.tabs('add', {
				title:'Game',
				href: '/manager/game',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
			$.getScript("/manager/game.js", function( data, textStatus, jqxhr ) { story.init(); });
		},
		addAccount: function() {
			this.component.tabs('add', {
				title:'Account',
				href: '/manager/account',
				closable:true,
				tools:[{
					iconCls:'icon-key',
					handler:function(){
						alert('refresh');
					}
				}]
			});
			$.getScript("/manager/account.js", function( data, textStatus, jqxhr ) { story.init(); });
		},
	},

};
