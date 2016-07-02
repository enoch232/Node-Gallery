var express = require('express');
var multer = require('multer');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var Image = require('./models/image');
var User = require('./models/user');

mongoose.connect("mongodb://localhost:27017/nodegallery");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var image_counter = 0;
var upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, callback){
			callback(null, 'uploads/');
		},
		filename: function(req, file, callback){//maybe add by gallery name and add number
			callback(null, req.body.galleryname + "-" +image_counter +".png");
			image_counter ++;
		}
	})
});
app.set("view engine", "ejs");
var port = process.env.PORT || 3000;
console.log("Server is now running at port " + port);
app.listen(port);

app.get("/", function(req, res){
	res.render("index");
});
app.get("/newgallery", function(req, res){
	res.render("newgallery");
});
app.post("/newgallery", upload.any(), function(req, res){
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

