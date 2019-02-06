import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
		
	}
	onLogout(){
		this._userService.deleteToken();
		this.router.navigate(['/login']);
	}
	
}
