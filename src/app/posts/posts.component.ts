import { Component, Input, NgModule, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { PostRead } from './post';
import { Observable, map } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})  
export class PostsComponent implements OnInit {

    posts: PostRead[] = [];

    postID: number = 0;

    postsCount: number = 0;

    constructor(public postsService: PostsService) { 
        this.postsService.getREALPosts().subscribe(
          (response: PostRead[]) => {
            this.posts = response;
            this.postsCount = this.posts.length; 
          });
    }

    ngOnInit() {}

    create() {

      const postTitleInput = document.getElementById('titleI') as HTMLInputElement;
      const postContentInput = document.getElementById('contentI') as HTMLInputElement;
  
      const postTitle = postTitleInput.value;
      const postContent = postContentInput.value;

      this.postsService.createPost(postTitle, postContent).subscribe(
        (response: number) => {
          this.postID = response;
        }
      );
    }

}
