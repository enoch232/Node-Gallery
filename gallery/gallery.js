var multer = require("multer");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
User = require('../user/user');
var gallerySchema = new Schema({
	user:{
		type: String,
		required: true
	},
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
module.exports.addGallery = function(user, image_counter, req, res){
	var newGallery = new Gallery();
	User.findOne({email: user.email}, function(err, foundUser){
		if (!foundUser){
			console.log("session expired!");
			res.redirect("/login");
		}else{
			if (err){
				console.log(err);
				res.redirect("/new");
			}else{
				foundUser.galleries.push(newGallery._id);
				foundUser.save(function(err){
					if (err){
						console.log("Error trying to update gallery list");
						res.redirect("/new");
					}
				});
			}
		}
	});
	newGallery.user = user.email;
	newGallery.galleryName = req.body.galleryname;
	newGallery.description = req.body.description;
	console.log(image_counter.count);
	for(var i = image_counter.count - 1; i >= 0; i --){
		newGallery.images.push(req.body.galleryname + "-" + i + ".png");
	}
	image_counter.count = 0; //make this object
	newGallery.save(function(err, gallery){
		if (err){
			console.log(err);
			res.redirect("/");
		}else{
			res.send(req.files);
		}
		
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