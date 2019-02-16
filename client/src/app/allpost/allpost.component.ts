import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router'; 
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserService } from '../user.service';
declare var $ : any;

@Component({
	selector: 'app-allpost',
	templateUrl: './allpost.component.html',
	styleUrls: ['./allpost.component.css']
})

export class AllpostComponent implements OnInit {
	posts: any;
	comment : any;
	_id : any;
	like : any;
	currentUser = JSON.parse(localStorage.getItem('login'))

	constructor(public _postService: PostService, public router: Router, public _userService: UserService) { }

	ngOnInit() {
		this.getAllPost();
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
	getAllPost(){ 

		var userId=JSON.parse(localStorage.getItem('login'))._id;
		this._postService.getAllPost(userId).subscribe((posts:any)=>{
			this.posts = posts;
			console.log("Posts received = ",this.posts);

		},(err)=>{
			alert("There seems to be some error. please try again later.")
			console.error("Error in getting post in ngInit",err);
		});
	}
	getImageLayoutClass(length){
		console.log(length);
		switch (length) {
			case 1:
			// code...
			return "single_image_layout";
			break;

			case 2:
			return "double_image_layout";
			break;

			case 3:
			return "three_image_layout";
			break;
			case 4:
			return "four_image_layout";
			break;
			case 5:
			return "five_image_layout";
			break;

			default:
			// code...
			return "five_plus_image_layout"
			break;
		}
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
			this.posts[index].comment.push(res);
		},err=>{
			console.log("error======>",err);
		})	
	}
	deletePosts(post,i){
		console.log(post);
		this._postService.deletePost(post._id);
		this.posts.splice(i,1);
	}
	// updatePosts(post){
		// 	console.log(post);
		// 	this.router.navigate(['updatepost',post._id]);
		// }
	}
