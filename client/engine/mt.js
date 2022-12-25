var mt = {

	system: {},
	map: null,

	register: function(filepath) {
		// $.getScript(filepath);
		$.ajax({ async: false, url: filepath, dataType: "script" });
	},

	init: function() {

		// Debug
		this.debug = true;

		// HTML
		this.html = {
			canvas: document.getElementById("canvas")
		};

		// BABYLON
		this.babylon = {
			engine: new BABYLON.Engine(this.html.canvas, true)
		};
		this.babylon.engine.enableOfflineSupport = true;

		// Systems
		this.register("/engine/entities/EntityMgr.js");
		this.register("/engine/maps/MapMgr.js");

		// Util
		this.util.init();
		
		// Load Map
		this.system.MapMgr.load();

		// Framework
		this.babylon.engine.runRenderLoop(this.framework);

		// bind object debug
		if (mt.debug)
			mt.c = mt.babylon.camera;
	},

	framework: function() {
		mt.babylon.scene.render();
	},

	util: {
		init: function() {
			mt.vec3 = (x, y, z) => {
				if (x == undefined && y == undefined && z == undefined)
					return BABYLON.Vector3.Zero();
				return new BABYLON.Vector3(x, y, z);
			}
		}
	}

};