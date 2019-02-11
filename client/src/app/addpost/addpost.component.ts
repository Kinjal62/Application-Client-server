import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

post = {content : "",datetime: new Date(), publish: "true", fileName: ""};

posts = [];
files : FileList;
  constructor(public _postService: PostService, public router: Router) { }

  ngOnInit() {
    
  }
 //adding new post
  addPostContent(post){
  	console.log(this.post);
    if(this.files && this.files.length){
    this._postService.uploadFile(this.files,post).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });  
    }
    else{
      this._postService.addPost(this.post).subscribe(res=>{
        console.log(res);
      },error=>{
        console.log(error);
      });
    }
  	// form.reset();  
  }
  changeFile(e){
    console.log(e.target.files);
    this.files = e.target.files;
   // this._postService.uploadFile(this.files); 
  }
 
}
