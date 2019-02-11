var mongoose = require('mongoose');
var Schema	= mongoose.Schema;
var PostSchema = new Schema({
	userId: [{type: Schema.Types.ObjectId, ref: 'users'}],
	content: String,
	datetime: Date,
	publish: Boolean,
	fileName: String,
	like: [{type: Schema.Types.ObjectId, ref: 'users'}],
	comment : []
});

module.exports = mongoose.model('post', PostSchema); 