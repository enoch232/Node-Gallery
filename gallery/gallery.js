var multer = require("multer");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var gallerySchema = new Schema({
	galleryName: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	images: []
});
var Gallery = module.exports = mongoose.model("gallery", gallerySchema);
//add a gallery
module.exports.addGallery = function(image_counter, req, res){
	var newGallery = new Gallery();
	newGallery.galleryName = req.body.galleryname;
	newGallery.description = req.body.description;
	console.log(image_counter);
	for(var i = image_counter - 1; i >= 0; i --){
		newGallery.images.push(req.body.galleryname + "-" + i + ".png");
	}
	image_counter = 0;
	newGallery.save(function(err, files){
		if (err){
			console.log(err);
			res.redirect("/");
		}
		res.send(req.files);
	});
}
//get all galleries
module.exports.getGalleries = function(req, res){
	Gallery.find(function(err, galleries){
		if (!galleries){
			console.log("galleries not found");
			res.redirect("/");
		}else{
			if (err){
				console.log(err);
				res.redirect("/");
			}else{
				res.render("gallery/index", {galleries: galleries });
			}
		}
		
	});
}
//get specific gallery
module.exports.getGallery = function(id, req, res){
	Gallery.findById(id, function(err, gallery){
		if (!gallery){
			console.log("gallery doesnt exist.");
			res.redirect("/");
		}else{
			if (err){
				console.log("err occurred.");
				res.redirect("/");
			}else{
				res.render("gallery/show", {gallery: gallery});
			}
		}
	});
}