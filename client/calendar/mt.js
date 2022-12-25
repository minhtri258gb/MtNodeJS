var mt = {

	init: function() {
		this.calendar.init();
	},

	calendar: {

		_jquery: null,

		init: function() {
			this._jquery = $('#calendar');
			this._jquery.calendar({
				width: 500,
				height: 500,
				firstDay: 1,
				weeks: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
				months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
				onChange: this.onChange
			});
		},

		onChange: function(newDate, oldDate) { // Date, Date
			console.log(newDate, oldDate)
		}

	},

	solar: {

		to: function(date) {

			// Phân tích ngày
			let dd = dateObj.getUTCDate();
			let mm = dateObj.getUTCMonth() + 1;
			let yy = dateObj.getUTCFullYear();

			// Đổi ngày dd/mm/yyyy ra số ngày Julius jd
			let a = (14 - mm) / 12;
			let y = yy + 4800 - a;
			let m = mm + 12 * a - 3;

			// Lịch Gregory:
			// let jd = dd + (153*m+2)/5 + 365*y + y/4 - y/100 + y/400 - 32045;

			// Lịch Julius:
			let jd = dd + (153*m+2)/5 + 365*y + y/4 - 32083;

			return jd;
		}

	},

	utils: {

		str2date: function(str) { // Format 
			return date;
		}

	}

};