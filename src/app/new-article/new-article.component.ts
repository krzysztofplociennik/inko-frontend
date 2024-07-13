import { Component, OnInit } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';
import { ArticleType } from './article';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit {

  articleTypes: ArticleType[] | undefined;

  articleTitle: string = '';
  selectedType!: ArticleType;
  tags!: string[];
  content = '';

  constructor(public service: CreateArticleService) { }

  ngOnInit(): void {

    this.articleTypes = [
      { code: '1', name: 'Programming' },
      { code: '2', name: 'Tools' },
      { code: '3', name: 'OS' },
    ];
  }

  createArticle() {

    const type: string = this.selectedType?.name
    const tags: string[] = this.tags;

    this.service.create(this.articleTitle, type, tags, this.content).subscribe(
      (response: string) => {
        console.log('response: ' + response);
      }
    );

    this.clearInputs();
  }

  reloadPage(): void {
    window.location.reload();
  }

  clearInputs(): void {
    this.articleTitle = '';
    this.tags = [];
    this.content = '';
  }

}
