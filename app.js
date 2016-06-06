var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var Gallery = require('./models/user')
mongoose.connect("mongodb://localhost/nodegallery");
var app = express();

var port = process.env.PORT || 3000;

app.get("/",function(req, res){
	Gallery.getGalleries(function(err, galleries){
		if (err){
			res.json(err);
		}else{
			res.json(galleries);
		}
	});
});
console.log("Server is now running at port "+port);
app.listen(port);
