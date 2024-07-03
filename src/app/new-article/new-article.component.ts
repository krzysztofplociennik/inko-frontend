import { Component } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {

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
