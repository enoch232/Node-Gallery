var mongoose = require('mongoose');
var multer = require("multer");
var bcrypt = require("bcrypt");
var Gallery = require("../gallery/gallery");
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
//user registration
module.exports.addUser = function(user, req, res){
	var newUser = new User();
	newUser.fullname = user.fullname;
	newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	newUser.email = user.email;
	newUser.save(function(err, user){
		if (err){
			console.log(err);
			res.redirect("/register");
		}else{
			req.session.user = user;
			res.redirect("/");
			//res.render("gallery/index", {user: user, galleries: Gallery.find() });
		}
	});
}
//user authentication
module.exports.login = function(loginUser, req, res){
	User.findOne({email: loginUser.email}, function(err, user){
		if (!user){
			console.log("Wrong email");
			res.render("user/login");
		}else{
			if (err){
				console.log(err);
				res.render("user/login");
			}
			if (bcrypt.compareSync(loginUser.password, user.password)){
				console.log("successfully logged in!");
				req.session.user = user;
				res.redirect("/");
			}else{
				console.log("Wrong password");
				res.render("user/login");
			}
		}
	});
}