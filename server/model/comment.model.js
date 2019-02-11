var mongoose = require('mongoose');
var Schema	= mongoose.Schema;
var commentSchema = new Schema({
	userId: [{type: Schema.Types.ObjectId, ref: 'users'}],
	postId: String,
	comment: String
});

commentSchema.pre('find',function(next){
	this.populate('userId');
	next();
})
module.exports = mongoose.model('comment', commentSchema);