mt.system.MapMgr = {
	list: {},

	load: function(mapname) {

		if (mapname == undefined)
			mapname = this.getDefault();

		mt.register("/engine/maps/"+mapname+".js");
		mt.map.load();
	},

	/**
	 * Lấy map gần nhất sử dụng hoặc lobby
	 * @returns String
	 */
	getDefault: function() {
		// #TODO Lấy map gần nhất sử dụng
		return "lobby";
	}

};
