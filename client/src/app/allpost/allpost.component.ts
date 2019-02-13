import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router'; 
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserService } from '../user.service';
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
}
