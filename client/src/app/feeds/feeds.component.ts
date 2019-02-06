import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
	friendsPost = [];
	users = [];
	author = [];
	
	constructor(public _postService: PostService, public router: Router) { }

	ngOnInit() {
		this.getFriendsPost();
	}
	
	getFriendsPost(){
		var body = JSON.parse(localStorage.getItem('login'))._id;
		this._postService.getFriendPost(body).subscribe((res : any)=>{
			console.log("friendsPost",res);
			var k = 0;
			for(var i = 0; i < res.length; i++){
				for(var j = 0; j < res[i].post.length; ++j){
					console.log("friendsPost============>",res[i].fname);
					//this.friendsPost.push(res[i].post[j]);
					this.friendsPost[k] = res[i].post[j];	
					//this.friendsPost[k].map(el=>{
					this.friendsPost[k]['author'] = res[i].fname + ' ' + res[i].lname;
					//});	
					k++;
				}
			}
			//console.log("This.users===================>", this.users)
			console.log("posts in service",this.friendsPost);
		},err=>{
			console.log("Error",err)
		});
	}
}


