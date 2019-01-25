import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	user = {fname:"",lname:"",dob:"", email:"", password:""};
	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
	}
	//for sign up
	addUser(){
		console.log(this.user);
		this._userService.getUser(this.user).subscribe(res=>{
			console.log(res);
		},error=>{
			console.log(error);
		});
	}
	
}
