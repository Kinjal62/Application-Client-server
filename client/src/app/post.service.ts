import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http:HttpClient) { }
  //for adding new post in feed
	addPost(body){
		return this.http.post("http://localhost:8000/post", body)
	}
}
