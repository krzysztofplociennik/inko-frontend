import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleService } from './service/create-article.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CKEditorModule,
  ],
  exports: [],
  providers: [
    CreateArticleService,
  ]
})
export class NewArticleModule { }
