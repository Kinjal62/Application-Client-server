import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
post = {content : ""};
posts : any[] = [];

  constructor(public _postService: PostService, public router: Router) { }

  ngOnInit() {
    
  }
 //adding new post
  addPostContent(){
  	console.log(this.post);
  	this._postService.addPost(this.post).subscribe(res=>{
  		console.log(res);
  	},error=>{
  		console.log(error);
  	});
  }
  
}
