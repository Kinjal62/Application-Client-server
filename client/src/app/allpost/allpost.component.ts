import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router'; 

@Component({
	selector: 'app-allpost',
	templateUrl: './allpost.component.html',
	styleUrls: ['./allpost.component.css']
})
export class AllpostComponent implements OnInit {
	posts: any;
	constructor(public _postService: PostService, public router: Router) { }

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

}
