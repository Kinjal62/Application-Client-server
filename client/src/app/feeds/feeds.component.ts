import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
post = {content : ""};
  constructor(public _postService: PostService, public router: Router) { }

  ngOnInit() {
  }
  //adding new post
  addUserPost(){
  	console.log(this.post);
  	this._postService.addPost(this.post).subscribe(res=>{
  		console.log(res);
  	},error=>{
  		console.log(error);
  	});
  }
}
