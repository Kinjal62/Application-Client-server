var userModel = require('../model/user.model');
let userController = {};

userController.signUp = function(req,res){
	var user = new userModel(req.body);
	user.save(function(err,savedUser){
		console.log(err,savedUser);
		res.send(savedUser);
	})
	console.log(req.body);
}

userController.logIn = function(req,res){
	//console.log("logIn");
	console.log("req.method" , req.method);
	if(req.method == 'POST' && req.body.email && req.body.password){

		userModel.findOne( { email : req.body.email , password : req.body.password } )
		.select('-password')
		.exec((err, user)=>{
			if (err) {
				return res.status(500).send( { errMsg : err });
			}else if (user == null) {
				return res.status(403).send( { errMsg : 'Unauthorises Access' });
			}else{
				return res.status(200).send( { user : user });
			}
		});
	}else{
		return res.status(400).send({errMsg : 'Bad Data'});
	}
};

userController.getUserById = function(req,res){
	
	userModel.find({_id: req.params.id},function(err,foundUser){
		res.send(err || foundUser);
	})
}

userController.getAllFriend = function(req,res){
	var currentUser = req.params.requestedUser;
	console.log("id",req.params.requestedUser);
	userModel.findOne({_id: currentUser})
	.exec((err,result)=>{
		if(err){
			res.status(500).send(err);
		}
		userModel.find({'_id': {$in: result.friend}})
		.populate('user')
		.exec((err,users)=>{
			if(err){res.status(500).send(err);
			}
			console.log("users",users);
			res.status(200).send(users);
		})
	})
}	
userController.searchUser = function(req,res){
	var key = req.query.key;
	console.log("key from userController",key);
	userModel.find({$or:[{lname:key},{fname:key}]}, function(err,searchedUser){
		res.send(err || searchedUser);
		console.log(searchedUser);
	})
}
userController.followUser = function(req, res){
	var currentUser = req.body.requestedUser;
	var user = req.body.userTobeFollowed;
	userModel.findOne({_id:currentUser},function(err,followUser){
		console.log(followUser);
		followUser.friend.push(user);
		followUser.save();
		res.send(followUser);
	})
}

userController.unFollowUser = function(req,res){
	var currentUser = req.body.requestedUser;
	var user = req.body.userTobeUnFollowed;
	userModel.findOne({_id:currentUser}, function(err,result){
		console.log(result);
		var index = result.friend.indexOf(user);
		if (index == -1){
			console.log("result not found")
			res.status(401).send("Bad req");
		}
		else{
			result.friend.splice(index,1);
			result.save();
			res.send(result);
		}
	})
}
userController.uploadFile = function(req,res){
	console.log("uploadFile=========>",req.body);
	var sampleFile = req.files.uploadFile;
	console.log("Sample File",sampleFile);
	sampleFile.mv('./uploads/'+sampleFile.name,function(err,result){
		if(err){
			console.log("Errorrrrr=====>",err);
			res.status(500).send(err);
		}
		else{
			switch (req.body.change){
				case "profile":
				var userData = {
					fileName: '/uploads/'+sampleFile.name
				};
				break;

				case "cover":
				var userData = {
					cover: '/uploads/'+sampleFile.name
				};
				break;
			}
			var userId = req.body.userId;
			console.log("addPost=====>",userData);
			userModel.findOneAndUpdate({_id: userId},{$set: userData},{upsert:true, new: true},function(err,updatedUser){
				console.log(err,updatedUser)
				res.send(updatedUser);
			})
		}
	});
}	
module.exports = userController;