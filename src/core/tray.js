import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import systray from 'systray';
import { exec } from 'child_process';

var mtTray = {

	c_systray: null, // library systray

	menus: [],

	init: function() {

		// Library
		// const SysTray = require('systray').default;
		// mt.lib.register('open', 'open');

		this.initMenu();

		// Init Tray icon
		const SysTray = systray.default;
		this.c_systray = new SysTray({
			menu: {
				icon: this.loadIcon(),
				title: "MT Server",
				tooltip: "MT Server online ...",
				items: this.menus
			},
			debug: false,
			copyDir: false,
		})

		// Register onClick item
		this.c_systray.onClick(action => {
			this.menus[action.seq_id].onClick(action);
		})
	},

	initMenu: function() {
		this.addMenuItem("Music", "Open music", false, true, () => this.actionOpenURL('music'));
		this.addMenuItem("Manager", "Open manager", false, true, () => this.actionOpenURL('manager'));
		this.addMenuItem("Console", "Show console", false, true, (action) => this.actionToogleConsole(action));
		this.addMenuItem("Shutdow", "Shutdown server", false, true, () => this.actionShutdown());
	},

	loadIcon: function() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		let filepath = path.resolve(__dirname, '../../res/logo.ico');
		let data = fs.readFileSync(filepath);
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
		this.c_systray.sendAction({
			type: 'update-item',
			item: {
			...action.item,
			checked: !action.item.checked,
			},
			seq_id: action.seq_id,
		})
	},

	// Action
	actionOpenURL: function(url) {
		let host = `http://localhost:${mt.server.port}`;
		exec(`start chrome ${host}/${url}`, (err, stdout, stderr) => {
			if (err)
				console.error('Lỗi khi mở Chrome:', err);
		});
	},
	actionToogleConsole: function(action) {
		this.toogleCheck(action);
		mt.util.hiddenConsole(action.item.checked);
	},
	actionShutdown: function() {
		console.log('[INFO] Server Shutdown.');
		this.c_systray.kill();
		process.exit(0); // Đóng máy chủ
	},

};
export default mtTray;