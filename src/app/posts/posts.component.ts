import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { PostRead } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})  
export class PostsComponent implements OnInit {

    posts: PostRead[] = [];

    postID: number = 0;

    postsCount: number = 0;

    constructor(public postsService: PostsService) { 
        this.postsService.getREALPosts(1, 1).subscribe(
          (response: PostRead[]) => {
            this.posts = response;
            this.postsCount = this.posts.length; 
          });
    }

    getPosts() {
      this.postsService.getREALPosts(1, 1).subscribe(
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
