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
	
}
