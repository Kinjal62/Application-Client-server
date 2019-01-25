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

userController.getUserById = function( req,res){
	getModel.find({_id: req.params.id},function(err,foundUser){
		res.send(err || foundUser);
	})
}
module.exports = userController;