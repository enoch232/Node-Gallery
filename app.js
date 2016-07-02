var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var Gallery = require('./models/user')
mongoose.connect("mongodb://localhost/nodegallery");
var app = express();
app.set("view engine", "ejs");
var port = process.env.PORT || 3000;

app.get("/",function(req, res){
	render("index")
});
console.log("Server is now running at port "+port);
app.listen(port);
