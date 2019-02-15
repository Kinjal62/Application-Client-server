import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';
import * as _ from 'lodash';
declare var $ : any;

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
	post = {content : "",datetime: new Date(), publish: "true",fileName: "", like: "", comment:""};
	friendsPost = [];
	users = [];
	_id : any;
	like : any;
	comment : any;
	friends : [];
	currentUser = JSON.parse(localStorage.getItem('login'))
	posts: any[] = [];
	constructor(public _postService: PostService, public router: Router, public _userService: UserService) { }

	ngOnInit() {
		this.getFriendsPost();

		setTimeout(function () {
			$('.grid').masonry({
				itemSelector: '.grid-item'
			});
		}, 1000);

		$(document).on("resize", function(){
			$('.grid').masonry({
				itemSelector: '.grid-item'
			});
		});
	}
	
	getFriendsPost(){
		var body = JSON.parse(localStorage.getItem('login'))._id;
		this._postService.getFriendPost(body).subscribe((res : any)=>{
			console.log("friendsPost",this.friendsPost);
			this.friendsPost = res;

			// var k = 0;
			// for(var i = 0; i < res.length; i++){
			// 	for(var j = 0; j < res[i].post.length; ++j){
			// 		console.log("friendsPost============>",res[i].fname);
			// 		//this.friendsPost.push(res[i].post[j]);
			// 		this.friendsPost[k] = res[i].post[j];	
			// 		//this.friendsPost[k].map(el=>{
			// 			this.friendsPost[k]['author'] = res[i].fname + ' ' + res[i].lname;
			// 			//});	
			// 			k++;
			// 		}
			// 	}
				//console.log("This.users===================>", this.users)
				console.log("posts in service",this.friendsPost);
			},err=>{
				console.log("Error",err)
			});
	}
	likePost(postid){
		var id = JSON.parse(localStorage.getItem('login'))._id;
		this._postService.like(id, postid).subscribe(res=>{
			console.log("response=====>",res);
			this.like = res;
		},error=>{
			console.log("error===>",error);
		});
	}
	addComment(index, postid, comment) {
		var id = JSON.parse(localStorage.getItem('login'))._id;
		//console.log(this.post);
		this._postService.addComments(id,postid._id,comment).subscribe(res=>{
			console.log("response======>",res);
			this.friendsPost[index].comment.push(res);
		},err=>{
			console.log("error======>",err);
		})	
	}
	deletePosts(post,i){
		console.log(post);
		this._postService.deletePost(post._id);
		this.posts.splice(i,1);
	}
}

