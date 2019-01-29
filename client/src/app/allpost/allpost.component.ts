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
		this._postService.getAllPost().subscribe((posts:any)=>{
			this.posts = posts.post;
			console.log("Posts received = ",this.posts);
		},(err)=>{
			alert("There seems to be some error. please try again later.")
			console.error("Error in getting post in ngInit",err);
		});
	}

}
