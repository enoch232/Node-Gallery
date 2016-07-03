var express = require('express');
var multer = require('multer');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');
Gallery = require('./gallery/gallery');
User = require('./user/user');

mongoose.connect("mongodb://localhost:27017/nodegallery");
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
var image_counter = 0;
var upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, callback){
			callback(null, 'public/images/');
		},
		filename: function(req, file, callback){//maybe add by gallery name and add number
			callback(null, req.body.galleryname + "-" +image_counter +".png");
			image_counter ++;
		}
	})
});
app.set("view engine", "ejs");
app.set('views', __dirname + "/");
app.use(express.static('public'));
var port = process.env.PORT || 3000;
console.log("Server is now running at port " + port);
app.listen(port);

app.get("/", function(req, res){
	Gallery.getGalleries(function(err, galleries){
		if (err){
			throw err;
		}else{
			res.render("gallery/index", {galleries: galleries });
		}
	});
});
app.get("/new", function(req, res){
	res.render("gallery/new");
});
app.post("/new", upload.any(), function(req, res){
	var newGallery = new Gallery();
	newGallery.galleryName = req.body.galleryname;
	newGallery.description = req.body.description;
	console.log(image_counter);
	for(var i = image_counter - 1; i >= 0; i --){
		newGallery.images.push(req.body.galleryname + "-" + i + ".png");
	}
	newGallery.save(function(err, files){
		if (err){
			throw err;
		}
		res.send(req.files);
	});
});
app.get("/show/:_id", function(req, res){
	Gallery.getGallery(req.param._id, function(err, gallery){
		if (!gallery){
			console.log("gallery doesnt exist.");
			res.redirect("/");
		}
		if (err){
			console.log("err occurred.")
			throw err;
		}else{
			res.render("gallery/show", {gallery: gallery});
		}
	});
});
