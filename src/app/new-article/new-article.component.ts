import { Component } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';
import {EditorConfig, ST_BUTTONS, UNDO_BUTTON, SEPARATOR, BOLD_BUTTON, ITALIC_BUTTON} from 'ngx-simple-text-editor';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent {

  content = '<p>Hi</p>';
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: [UNDO_BUTTON, SEPARATOR, BOLD_BUTTON, ITALIC_BUTTON],
  };

  articleID: string = '';

  constructor(
    public service: CreateArticleService
  ) { 
  }

  createArticle() {

    this.service.create().subscribe(
      (response: string) => {
        this.articleID = response;
      }
    );
  }

}
