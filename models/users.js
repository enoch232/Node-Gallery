var mongoose = require('mongoose');
var users = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model('User', users)