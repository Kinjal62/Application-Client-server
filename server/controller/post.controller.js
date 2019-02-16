var userModel = require('../model/user.model');
var postModel = require('../model/post.model');
var async = require('async');
let postController = {};

postController.addPost = function(req,res){
	var userId = req.body.userId;
	console.log("userId",userId);
	var post = new postModel(req.body);
	post.save(function(err,savedpost){
		console.log(err,savedpost);
		res.send(savedpost);
	})
	console.log(req.body);
}
postController.addFriend = function(req,res){
	var post = new postModel(req.body);
	post.save(function(err,savedFriend){
		console.log(err,savedFriend);
		res.send(savedFriend);
	})
	console.log(req.body);
}

postController.deletePost = function(req,res){
	var postid = req.params.id;
	postModel.remove({_id:postid}, function(err,deletePost){
		console.log(err,deletePost)
		res.send(deletePost);
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
	postModel.find({_id: req.params.id},function(err,foundPosts){
		console.log(err,foundPost)
		res.send(foundPost);
	})
}
postController.getPosts = function(req,res){
	postModel.find({},function(err,posts){
		res.send({posts:posts});
	})
}
postController.getAllPost = function(req,res){
	var userId = req.params.userId;
	console.log("userId",userId);
	postModel
	.find({userId: userId})
	.populate('post')
	.exec((err,result)=>{
		if(err) { res.status(500).send(err); }
		res.status(200).send(result);
	})
}
postController.getFriendPost = function(req,res){
	var currentUser = req.params.requestedUser;
	console.log("id",req.params.requestedUser);
	userModel.findOne({_id: currentUser})
	.exec((err,result)=>{
		if(err){
			res.status(500).send(err);
		}
		postModel.find({'userId': {$in: result.friend}})
		.populate('userId')
		.populate('comment')
		// .populate({path: 'comment', populate:'userId'})
		// .populate({path: 'comment', populate: 'comment'})
		// .select('-friend')
		.exec((err,posts)=>{
			if(err){res.status(500).send(err);
			}
			console.log("posts",posts);
			res.status(200).send(posts);
		})
	})
}	
postController.uploadFile = function(req,res){
	console.log("uploadfile=======>",req.body);
	var files = [];
	
	var userId = req.body.userId;
	console.log("userId==========>>>>",userId);
	var post_data = {
		content : req.body.content,
		datetime : req.body.datetime,
		publish : req.body.publish,
		fileName : files,
		userId : req.body.userId
	};

	var postData = new postModel(post_data);
	console.log("postData",postData);
	postData.save(function(error,savedpost){
		if (error) {
			return res.status(500).send(error);
		}else{
			for(var i = 0; i < req.files.uploadFile.length; i++){
				console.log("sampleFile", req.files.uploadFile[i]);				
				var sampleFile = req.files.uploadFile[i];
				sampleFile.mv('./uploads/'+sampleFile.name, function(err) {
					if (err){
						return res.status(500).send(err);
					}else{
					}
				});
				var fileName = sampleFile.name;
				var fileNameArr = fileName.split("\\");
				fileName  = fileNameArr[2];
				files.push("/uploads/"+sampleFile.name);
				console.log(files);
				savedpost.fileName = files;
				savedpost.save();
			}
			res.status(200).send(savedpost);
		}
	});
	console.log(req.body);
}	

postController.like = function(req,res){
	var postId = req.body.postId;
	console.log("postId============>",postId);
	var userId = req.body.userId;
	console.log("userId=========>",userId);
	postModel.findOne({_id: postId}).exec((err,result)=>{
		if(err){
			res.status(500).send("err");
		}else{
			console.log("result",res);
			result.like.push(userId);
			result.save();
			res.status(200).send("result")
		}
	})
}		

module.exports = postController;