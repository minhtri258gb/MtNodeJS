var mt = null;
var tray = {
	
	menus: [],

	init: function(_mt) {
		mt = _mt;

		// Library
		const SysTray = require('systray').default;
		mt.lib.register('open', 'open');

		this.initMenu();

		// Init Tray icon
		mt.lib.systray = new SysTray({
			menu: {
				icon: tray.loadIcon(),
				title: "MT Server",
				tooltip: "MT Server online ...",
				items: tray.menus
			},
			debug: false,
			copyDir: false,
		})
		
		// Register onClick item
		mt.lib.systray.onClick(action => {
			tray.menus[action.seq_id].onClick(action);
		})
	},

	initMenu: function() {

		this.addMenuItem("Music", "Open music", false, true, function(action) {
			mt.lib.open("http://localhost/music");
		});

		this.addMenuItem("Manager", "Open manager", false, true, function(action) {
			mt.lib.open("http://localhost/manager");
		});

		this.addMenuItem("Console", "Show console", false, true, function(action) {
			tray.toogleCheck(action);
			mt.util.hiddenConsole(action.item.checked);
		});

		this.addMenuItem("Shutdow", "Shutdown server", false, true, function(action) {
			mt.lib.systray.kill();
		});
		
	},

	loadIcon: function() {
		let filepath = mt.lib.path.join(__dirname, '../../res', 'logo.ico');
		data = mt.lib.fs.readFileSync(filepath);
		return data.toString('base64');
	},

	addMenuItem: function(title, tooltip, checked, enabled, onClick) {
		let item = {
			title: title,
			tooltip: tooltip,
			checked: checked,
			enabled: enabled,
			onClick: onClick
		};
		this.menus.push(item);
	},

	toogleCheck: function(action) {
		mt.lib.systray.sendAction({
			type: 'update-item',
			item: {
			...action.item,
			checked: !action.item.checked,
			},
			seq_id: action.seq_id,
		})
	}
};

module.exports = tray;
