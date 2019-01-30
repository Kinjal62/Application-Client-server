import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-connection',
	templateUrl: './connection.component.html',
	styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
	friends = [];
	_id: any;
	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
		this.getAllFriends();
	}
	
	getAllFriends(){
		var currentUser = JSON.parse(localStorage.getItem('login'))._id;
		this._userService.getAllFriend(currentUser).subscribe((res : any)=>{
			console.log("Response",res);
			for(var i = 0; i < res.length; i++){
					this.friends.push(res[i]);
				}
			console.log("users in service",this.friends);
		},err=>{
			console.log("Error",err)
		});
		
	}
	

  unFollowFriend(_id){
    console.log("response",_id);
    this._userService.unFollowUser(_id).subscribe(res=>{
      console.log("response",res);
      this._id = res;
      localStorage.setItem('login',JSON.stringify(res));
    },err=>{
      console.log("Error",err);
    })
    console.log("data",_id);
  }
}
