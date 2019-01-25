var mongoose = require('mongoose');
var Schema	= mongoose.Schema;
var PostSchema = new Schema({
	content: String,
	datetime: Date,
	publish: Boolean
});

module.exports = mongoose.model('post', PostSchema);