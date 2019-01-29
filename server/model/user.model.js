var mongoose = require('mongoose');
var Schema	= mongoose.Schema;
var UserSchema = new Schema({
	fname: String,
	lname: String,
	dob: Date,
	email: String,
	password: String,
	friend: [{type: Schema.Types.ObjectId, ref: 'users'}],
	post: [{type: Schema.Types.ObjectId, ref: 'post'}]
});

module.exports = mongoose.model('users', UserSchema);