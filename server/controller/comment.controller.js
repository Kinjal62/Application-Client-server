var commentModel = require('../model/comment.model');
var userModel = require('../model/user.model');
var postModel = require('../model/post.model');
let commentController = {};

commentController.addComments = function(req,res){
	var userId = req.body.userId;
	console.log("UserId==========>",userId);
	var postId = req.body.postId;
	console.log("postId============>",postId);
	var comment = new commentModel(req.body);
	console.log("comment======>",comment);
	
	comment.save(function(err,savedcomment){
		console.log(err,savedcomment);
		if (err) { 
			res.status(500).send(err); 
		}else{
			postModel
			.findOne({_id: postId})
			.exec((err, user)=>{
				console.log(user);
				if (err) {
					res.status(500).send(err);
				}else{
					user.comment.push(savedcomment._id);
					user.save();
					res.status(200).send(savedcomment);
				}
			});
		}
	});
}

commentController.getComments = function(req,res){

	console.log("request",req);
	var userId = req.params.id;
	console.log("user ID ===============>" , userId);

	var postId = req.params.postId;
	console.log("postId",postId);
	var comment = req.body._id;
	console.log("comment",comment);
	postModel
	.findOne({ _id: postId })
	.populate('comment')
	.exec((err, result)=>{
		if (err) { res.status(500).send(err); }

		result.comment.push(userId);
		result.save();
		res.status(200).send(result);
	})

}
	module.exports = commentController;