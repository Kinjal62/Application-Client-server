import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	post : Subject<any>;
	removePost: Subject<any>;
	filesToUpload: Array<File> = [];
	constructor(public http:HttpClient) { 
		this.post = <Subject<any>>new Subject();
		this.removePost = <Subject<any>>new Subject();
	}
	removeObservableOfUser(){
		return this.removePost.asObservable();
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
	
	getAllPost(userId){
		return this.http.get("http://localhost:8000/post/user/"+userId);
	}

	getFriendPost(currentUser){
		console.log("get friend post");
		return this.http.get("http://localhost:8000/post/add-friend-post/"+currentUser);
	}

	uploadFile(file: FileList, data){
		let formdata = new FormData();
		data['userId'] = JSON.parse(localStorage.getItem('login'))._id;
		formdata.append("content",data.content);
		formdata.append("datetime",data.datetime);
		formdata.append("publish",data.publish);
		formdata.append("fileName",data.fileName);
		formdata.append("userId",data.userId);
		for(var i =0; i < file.length; i++){
			formdata.append("uploadFile",file[i]);
		}
		return this.http.post("http://localhost:8000/post/upload-image", formdata);
	} 
	like(id,postid){
		console.log(id);
		console.log(postid)
		var body = {
			userId: id,
			postId: postid
		}
		return this.http.post("http://localhost:8000/post/like",body);
	}
	addComments(id,postid,comment) {
		console.log("Id=======>",id);
		console.log("postid=====>",postid);
		console.log("comment=======>",comment);
		var body = {
			userId : id,
			postId : postid,
			comment : comment
		}
		return this.http.post("http://localhost:8000/comment/add-comment",body);
	}
	deletePost(id){
		this.http.delete("http://localhost:8000/post/"+id).subscribe(res=>{
			console.log(res);
			this.removePost.next({
				data:res
			})
		},err=>{
			console.log(err);
		});
	}
}