import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
declare var $:any;
import * as _ from 'lodash';

@Component({
	selector: 'app-connection',
	templateUrl: './connection.component.html',
	styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
	friends = [];
	_id: any;
	draggable: string = "";
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
			//this._id = res;
			this.friends.splice(_.findIndex(this.friends, {_id: _id}),1)
			localStorage.setItem('login',JSON.stringify(res));
		},err=>{
			console.log("Error",err);
		})
		console.log("data",_id);
	}
	@HostListener('drop',['$event']) dragOver(event){
		event.preventDefault();
	}
	
	@HostListener('drop', ['$event']) onDrop(event){
		event.preventDefault();
		event.stopPropagation();
		var id = $(this)[0].friends[0]._id;
		this.unFollowFriend(id);
	}
}