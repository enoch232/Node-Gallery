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