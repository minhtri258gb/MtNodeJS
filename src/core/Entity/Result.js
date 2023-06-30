
module.exports = {
	Success: function(data)
	{
		return { error: false, data: data };
	},

	Fail: function(message)
	{
		return { error: true, data: null, message: message };
	}
}
