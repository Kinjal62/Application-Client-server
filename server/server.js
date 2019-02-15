var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var cors = require('cors');
var userController = require('./controller/user.controller');
var postController = require('./controller/post.controller');
var fileUpload = require('express-fileupload');
var messageController = require('./controller/message.controller');
var commentController = require('./controller/comment.controller');
app.use(cors());
app.use(fileUpload());

var http = require('http');
var server = http.Server(app);

var socketIO = require('socket.io');
var io = socketIO(server);
var port = process.env.PORT || 8000;

var messageModel = require('./model/message.model');
mongoose.connect('mongodb://localhost:27017/socialmedia', {useNewUrlParser: true})
.then(() => {console.log("connected")})
.catch(err => {console.log(err)});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/user/signUp', userController.signUp);
app.post('/user/logIn', userController.logIn);
// app.get('/post/:id', userController.getUserById);
app.get('/user', userController.searchUser);
app.post('/user/add-friend', userController.followUser);
app.post('/user/unfollow-friend', userController.unFollowUser);
app.get('/user/:id', userController.getUserById);
app.get('/user/get-friend/:requestedUser',userController.getAllFriend);
app.post('/user/profile-photo',userController.uploadFile);
app.put('/user', userController.updateUser);

app.post('/post', postController.addPost);
app.post('/post', postController.addFriend);
app.delete('/post/:id', postController.deletePost);
app.put('/post', postController.updatePost);
// app.get('/post/:id', postController.getPostById);
app.get('/post/user/:userId', postController.getAllPost);
app.get('/post/add-friend-post/:requestedUser', postController.getFriendPost);
app.get('/post', postController.getPosts);

app.post('/post/upload-image',postController.uploadFile);
app.post('/message', messageController.getAllMessage);
app.post('/post/like',postController.like);
app.post('/comment/add-comment',commentController.addComments);
app.get('/comment/get-comment/:id',commentController.getComments);

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('new-message', (message) => {
		console.log(message);
		var msg = new messageModel(message);
		msg.save(function(){
			io.emit('new-message',message);
		});
	});
});
server.listen(port, () => {
	console.log(`started on port: ${port}`);
});