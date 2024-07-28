import { Component } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent {

  searchPhrase: string | undefined;

  articlesResults: ArticleSearch[] = [];

  constructor(public searchService: SearchService) {}

  searchForArticles() {
    this.searchService.search(1, 1).subscribe(
      (response: ArticleSearch[]) => {
        this.articlesResults = response;
      });

    console.log(this.articlesResults);
    
  }

}
