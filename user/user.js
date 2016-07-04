var mongoose = require('mongoose');
var multer = require("multer");
var bcrypt = require("bcrypt");
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
	},
	galleries: []
});
var User = module.exports = mongoose.model('User', userSchema);
module.exports.addUser = function(user, callback){
	var newUser = new User();
	newUser.fullname = user.fullname;
	newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	newUser.email = user.email;
	newUser.save(callback);
}