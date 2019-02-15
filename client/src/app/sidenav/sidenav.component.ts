import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

	constructor(public _userService: UserService, public router: Router) { }

	ngOnInit() {
	}
	onLogout(){
		this._userService.deleteToken();
		this.router.navigate(['/login']);
	}
}
