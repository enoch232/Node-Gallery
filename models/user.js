var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});
var Gallery = module.exports = mongoose.model('User', userSchema);
module.exports.getGalleries = function(callback, limit){
	Gallery.find(callback).limit(limit);
};