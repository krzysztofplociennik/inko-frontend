import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from './services/posts.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    PostsService,
  ]
})
export class PostsModule { }
