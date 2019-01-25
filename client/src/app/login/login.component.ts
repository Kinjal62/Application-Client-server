import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user = { email : "",password : "" };
	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
		

	}
	//for login user
	login(){
		console.log(this.user);
		this._userService.logIn(this.user).subscribe(res =>{
			console.log(res);
			localStorage.setItem('login',JSON.stringify(res));
		this.router.navigate(['feeds']);
		},error=>{
			console.log(error);
		});
	}

}
