import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PostsComponent } from '../posts/posts.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PostsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, PostsComponent]
})
export class HomeModule { }
