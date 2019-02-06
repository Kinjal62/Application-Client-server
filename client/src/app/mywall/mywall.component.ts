import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-mywall',
	templateUrl: './mywall.component.html',
	styleUrls: ['./mywall.component.css']
})
export class MywallComponent implements OnInit {
	user = {fname: "", lname: "", dob: "", email:"", fileName: "", cover: "" };
	users : [];
	files : FileList;
	constructor(public _userService: UserService, public router: Router) { }
	
	ngOnInit() {
		this.getProfile();
	}
	//get current user profile data
	getProfile(){
		var id = JSON.parse(localStorage.getItem('login'))._id;

		this._userService.getUserById(id).subscribe((res: any) =>{
			console.log(res);
			this.users = res;
			
		},error=>{
			console.log(error);
		});
	}
	//upload profile
	changeFile(e, changeType){
		console.log(e.target.files);
		var userId = JSON.parse(localStorage.getItem('login'))._id;
		console.log("userId===>",this.user['userId']);
		this.files = e.target.files;
		this._userService.uploadFile(this.files, userId, changeType).subscribe((res:any)=>{
			console.log("resss=======>",res);
			this.user = res;
		},error=>{
			console.log("errrorrrrrr====>",error);
		});  
	}
}
