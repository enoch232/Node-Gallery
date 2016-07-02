var multer = require("multer");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageSchema = new Schema({
	filename: {
		type: String,

	}
});
var image = module.exports = mongoose.model("image", imageSchema);