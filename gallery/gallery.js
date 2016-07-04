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