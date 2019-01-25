var userModel = require('../model/user.model');
var postModel = require('../model/post.model');
let postController = {};

postController.addPost = function(req,res){

var post = new postModel(req.body);
	post.save(function(err,savedpost){
		console.log(err,savedpost);
		res.send(savedpost);
	})
console.log(req.body);
}
postController.deletePost = function(req,res){
	var postid = req.params.id;
	postModel.remove({_id:postid}, function(err,deletePost){
		console.log(err,deleteUser)
		res.send(deleteUser);
	})
}

postController.updatePost = function(req,res){
	var postid = req.body.postid;
	postModel.findByIdAndUpdate({_id: postid},req.body,{upsert:true},function(err,updatedPost){
		console.log(err,updatedPost)
		res.send(updatedPost);
	})
}

postController.getPostById = function(req,res){
	postModel.find({_id: req.params.id},function(err,foundUser)
	{
		res.send(err || foundUser);
	})
}

postController.getPosts = function(req,res){
	postModel.find({}).populate('users')
	.exec(function(err,posts){
		res.send(posts);
	})
}
module.exports = postController;