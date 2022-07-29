
module.exports = {
	Success: function(data)
	{
		return { error: false, data: data };
	},

	Fail: function(message)
	{
		return { error: false, data: message };
	}
}
