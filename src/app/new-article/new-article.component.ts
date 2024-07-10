import { Component, OnInit } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';

interface City {
  name: string;
  code: string;
}

interface ArticleType {
  code: string;
  name: string;
}

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit {

  articleTitle: string = '';
  articleID: string = '';

  cities: City[] | undefined;
  selectedCity: City | undefined;

  articleTypes: ArticleType[] | undefined;
  selectedType: ArticleType | undefined;

  content = '';

  constructor(
    public service: CreateArticleService
  ) { 
  }

  ngOnInit(): void {

    this.articleTypes = [
      { code: '1', name: 'Programming' },
      { code: '2', name: 'Tools' },
      { code: '3', name: 'OS' },
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }

  createArticle() {

    this.service.create().subscribe(
      (response: string) => {
        this.articleID = response;
      }
    );
  }

}
