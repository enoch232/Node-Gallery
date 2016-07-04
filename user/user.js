var mongoose = require('mongoose');
var multer = require("multer");
var userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});
var User = module.exports = mongoose.model('User', userSchema);
module.exports.addUser = function(user, callback){
	var newUser = new User();
	newUser.name = user.name;
	newUser.password = user.password;
	newUser.email = user.email;
	newUser.save(callback);
}