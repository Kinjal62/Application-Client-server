import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	message: string;
	messages: string[] = [];
	friends = [];
	currentUser = JSON.parse(localStorage.getItem('login'));
	user : any;

	constructor(private _chatService: ChatService, public _userService: UserService) { 

		this.getMessages();
	}

	ngOnInit() { 
		this.getAllFriends();
	}	
	openModel(user){
		this.user = user;
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

	sendMessage(dstId) {
		var body = { 
			srcId: JSON.parse(localStorage.getItem('login'))._id,
			dstId: dstId,
			msg: this.message
		}
		this._chatService.sendMessage(body);
	}

	getMessages(){
		this._chatService.getMessages().subscribe((data: any) =>{
			console.log(data);
			if(data.dstId === this.currentUser._id){
				alert("you have a new Message from" + data.msg);
			}
		});
			
	}
	 
}
