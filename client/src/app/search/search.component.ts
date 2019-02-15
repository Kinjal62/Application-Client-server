import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from "@angular/router";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  key;
  users : any;
  _id: any;
  myFriend=[];

  constructor(public _userService: UserService, public route: ActivatedRoute) {
    this.route.paramMap.subscribe((params:any)=>{
      console.log(params);
      this.key = params.params.key;
      this.searchUser(this.key);
    });
  }

  ngOnInit() {
  }
  searchUser(key){
  	console.log("response",this.key);
  	this._userService.searchedUsers(this.key).subscribe(res=>{
  		console.log("response data",res);
  		this.users = res;
      this.myFriend = JSON.parse(localStorage.getItem('login')).friend;
      this.users.forEach((i)=>{
        var flag = _.includes(this.myFriend, i._id);
        i['isFriend'] = flag;
        console.log(i);
      })
      
    },err=>{
      console.log("Error",err);
    })
  	console.log("details in file",this.key);
  }

  followFriend(_id){
    console.log("response",_id);
    this._userService.followUser(_id).subscribe(res=>{
      console.log("response",res);
      this._id = res;
      localStorage.setItem('login',JSON.stringify(res));
    },err=>{
      console.log("Error",err);
    })
    console.log("data",_id);
  }

  unFollowFriend(_id){
    console.log("response",_id);
    this._userService.unFollowUser(_id).subscribe(res=>{
      console.log("response",res);
      this._id = res;
      localStorage.setItem('login',JSON.stringify(res));
    },err=>{
      console.log("Error",err);
    })
    console.log("data",_id);
  }
}


