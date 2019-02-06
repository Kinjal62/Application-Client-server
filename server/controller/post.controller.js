var userModel = require('../model/user.model');
var postModel = require('../model/post.model');
let postController = {};

postController.addPost = function(req,res){
	var userId = req.body.userId;
	var post = new postModel(req.body);
	post.save(function(err,savedpost){
		console.log(err,savedpost);
		if (err) { res.status(500).send(err); }
		userModel
		.findOne({_id: userId})
		.exec((err, user)=>{
			console.log(user);
			if (err) {res.status(500).send(err);}
			user.post.push(savedpost._id);
			user.save();
			res.status(200).send(savedpost);
		})
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
	postModel.find({_id: req.params.id},function(err,foundPosts){
		res.send(err || foundPost);
	})
}

postController.getPosts = function(req,res){
	postModel.find({},function(err,posts){
		res.send({posts:posts});
	})
}
postController.getAllPost = function(req,res){
	var userId = req.params.userId;
	userModel
	.findOne({_id: userId})
	.populate('post')
	.select('-friend')
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
		userModel.find({'_id': {$in: result.friend}})
		.populate('post')
		// .select('-friend');
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
	var sampleFile = req.files.uploadFile;
	console.log("Sample File",sampleFile);
	sampleFile.mv('./uploads/'+sampleFile.name,function(err,result){
		if(err){
			res.status(500).send(err);
		}
		else{
			var userId = req.body.userId;
			console.log("userId==========>>>>",userId);
			var fileName = req.body.fileName;
			console.log("fileName==========>>>",fileName);
			var fileNameArr = fileName.split("\\");
			console.log("fileNameArr======>>>>>>",fileNameArr);
			fileName  = fileNameArr[2];
			console.log("fileName", fileName);
			var post_data = {
				content : req.body.content,
				datetime : req.body.datetime,
				publish : req.body.publish,
				fileName : "/uploads/"+fileName
			};

			var postData = new postModel(post_data);
			console.log("postData",postData);
			postData.save(function(err,savedpost){
				console.log(err,savedpost);
				if (err) { 
					res.status(500).send(err); 
				}else{
					userModel
					.findOne({_id: userId})
					.exec((err, user)=>{
						console.log(user);
						if (err) {
							res.status(500).send(err);
						}else{
							user.post.push(savedpost._id);
							user.save();
							res.status(200).send(savedpost);
						}
					});
				}
			});
		}
	});
}			
module.exports = postController;