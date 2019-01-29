import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	post : Subject<any>;
	
	constructor(public http:HttpClient) { 
		this.post = <Subject<any>>new Subject();
	 
	}
	
	getAllPostSimple(){
		return this.http.get("http://localhost:8000/post"); 
	}
	//for adding new post in feed
	addPost(body){
		body['userId'] = JSON.parse(localStorage.getItem('login'))._id;
		console.log(body);
		return this.http.post("http://localhost:8000/post", body)
	}
	
	getAllPost(){
		return this.http.get("http://localhost:8000/post/" + JSON.parse(localStorage.getItem('login'))._id);
	}

	getFriendPost(currentUser){
		console.log("get friend post");
		return this.http.get("http://localhost:8000/post/add-friend-post/"+currentUser);
	}
	
}
