var express = require('express');
var multer = require('multer');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var sessions = require("client-sessions");
var path = require('path');
Gallery = require('./gallery/gallery');
User = require('./user/user');

mongoose.connect("mongodb://localhost:27017/nodegallery");
//middleware
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(sessions({
	cookieName: "session",
	secret: "asdkfjlk23j4lk2jlekjsdfjaldsfadf",
	duration: 30*60*1000,
	activeDuration: 5*60*1000,
	httpOnly: true,
	secure: true,
	ephemeral: true
}));
var image_counter = 0;
var upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, callback){
			callback(null, 'public/images/');
		},
		filename: function(req, file, callback){
		//maybe add by gallery name and add number
			callback(null, req.body.galleryname + "-" +image_counter +".png");
			image_counter ++;
		}
	})
});
//login checking middleware. Sets user, and resets session if needed.
var loginCheck = function(req, res, next){
	console.log("login needed");
	if (req.session && req.session.user){
		User.findOne({email: req.session.user.email}, function(err, user){
			if (!user){
				console.log("User undefined!");
				res.redirect("/login");
				req.session.reset();
			}else{
				if (err){
					console.log("Error has occurred");
					req.session.reset();
					res.redirect("/login");
				}else{
					console.log("session passed");
					//make user available
					res.locals.user = user
					next();
				}
			}
		});
	}else{
		res.redirect("/login");
	}
}
app.set("view engine", "ejs");
app.set('views', __dirname + "/");
app.use(express.static('public'));
var port = process.env.PORT || 3000;
console.log("Server is now running at port " + port);
app.listen(port);

//needs to be organized using routers
app.get("/login", function(req, res){
	res.render("user/login");
});
app.post("/login", function(req, res){
	User.login(req.body, req, res);
});
app.get("/register", function(req, res){
	res.render("user/register");
});
app.post("/register", function(req, res){
	User.addUser(req.body, req, res);
});
//middleware for loginCheck
app.use(loginCheck);
//all the paths below needs login.
app.get("/logout", function(req, res){
	delete req.session.user;
	res.redirect("/login");
});
app.get("/", function(req, res){
	Gallery.getGalleries(req, res);
});
app.get("/new", function(req, res){
	res.render("gallery/new");
});
app.post("/new", upload.any(), function(req, res){
	Gallery.addGallery(req.session.user, image_counter, req, res);
});
app.get("/show/:_id", function(req, res){
	Gallery.getGallery(req.params._id, req, res);
});
