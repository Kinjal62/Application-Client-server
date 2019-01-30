import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-mywall',
	templateUrl: './mywall.component.html',
	styleUrls: ['./mywall.component.css']
})
export class MywallComponent implements OnInit {
	users : [];
	
	
	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
		this.getProfile();
	}
	getProfile(){
		var id = JSON.parse(localStorage.getItem('login'))._id;
		this._userService.getUserById(id).subscribe((res: any) =>{
			console.log(res);
			this.users = res;
			
		},error=>{
			console.log(error);
		});
	}
}
