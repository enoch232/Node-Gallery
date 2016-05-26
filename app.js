var express = require('express');
var app = express();
app.get("/",function(req, res){
	res.end("Node Gallery");
});
app.listen(3000);
console.log("Server is now running at port 3000");