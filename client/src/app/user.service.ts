import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(public http:HttpClient) { }
	//for new user sign up
	getUser(body){
		return this.http.post("http://localhost:8000/user/signUp", body);
	}
	//for logIn
	logIn(body){
		return this.http.post("http://localhost:8000/user/logIn", body);
	}
	//for serch the friend
	searchedUsers(key){
		var query = "?key="+key
		return this.http.get("http://localhost:8000/user"+query);
	}
	//follow friend
	followUser(_id){
		console.log("follow friend",_id);
		var body = {requestedUser:JSON.parse(localStorage.getItem('login'))._id, userTobeFollowed:_id};
		return this.http.post("http://localhost:8000/user/add-friend", body);
	}
	//unfoolow friend
	unFollowUser(_id){
		console.log("unfollowUser",_id);
		var body = {requestedUser:JSON.parse(localStorage.getItem('login'))._id, userTobeUnFollowed:_id};
		return this.http.post("http://localhost:8000/user/unfollow-friend", body);
	}

	deleteToken() {
		localStorage.removeItem('login');
	}
	
	getUserById(id){
		return this.http.get("http://localhost:8000/user/"+id);

	}
	getAllFriend(currentUser){
		
		return this.http.get("http://localhost:8000/user/get-friend/"+currentUser);
	}
	//for upload profile
	uploadFile(file: FileList, data, changeType){
		console.log(data);
		let formData = new FormData();
		//data['userId'] = JSON.parse(localStorage.getItem('login'))._id;
		formData.append("userId",data);
		formData.append("change",changeType);
		formData.append("uploadFile",file[0]);
		return this.http.post("http://localhost:8000/user/profile-photo", formData);
 } 

}
