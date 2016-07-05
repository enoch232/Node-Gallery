var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentSchema = new Schema({
	commenter: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}
});
var Comment = module.exports = mongoose.model("comment", commentSchema);
module.exports.addComment = function(){

}
module.exports.deleteComment = function(){
	
}