var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var cors = require('cors');
var userController = require('./controller/user.controller');
var postController = require('./controller/post.controller');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/socialmedia', {useNewUrlParser: true})
.then(() => {console.log("connected")})
.catch(err => {console.log(err)});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/user/signUp', userController.signUp);
app.post('/user/logIn', userController.logIn);
app.get('/post/:id', userController.getUserById);

app.post('/post', postController.addPost);
app.delete('/post', postController.deletePost);
app.put('/post', postController.updatePost);
app.get('/post/:id', postController.getPostById);
app.get('/post', postController.getPosts);


app.listen(8000);