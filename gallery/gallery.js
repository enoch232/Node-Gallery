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
module.exports.getGalleries = function(callback){
	Gallery.find(callback);
}
module.exports.getGallery = function(id, callback){
	Gallery.findById(id, callback);
}