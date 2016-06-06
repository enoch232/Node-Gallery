var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var app = express();

var port = process.env.PORT || 3000;

app.get("/",function(req, res){
	res.end("Node Gallery");
});
app.post("/", function(req, res){

});

app.listen(port);
console.log("Server is now running at port "+port);