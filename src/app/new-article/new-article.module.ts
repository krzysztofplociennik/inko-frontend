import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleService } from './service/create-article.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [
    CreateArticleService,
  ]
})
export class NewArticleModule { }
