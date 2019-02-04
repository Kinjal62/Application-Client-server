import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
	friends = [];
	user : any;
	friend = [];
	constructor(public _postService: PostService, public router: Router) { }

	ngOnInit() {
		this.getFriendsPost();
	}
	
	getFriendsPost(){
		var id = JSON.parse(localStorage.getItem('login'))._id;
		this._postService.getFriendPost(id).subscribe((res : any)=>{
			console.log("Response",res);
			for(var i = 0; i < res.length; i++){
				this.friend.push(res[i]);
				//for(var j = 0; j < res[i].post.length; ++j){
				//	this.friends.push(res[i].post[j]);
			//	}
			}
			console.log("posts in service",this.friends);
		},err=>{
			console.log("Error",err)
		});
		
	}
}
