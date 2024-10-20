import { Component } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent {

  isHovered: boolean = false;
  hoveredIndex: number|null = null;

  searchPhrase: string | undefined;

  articlesResults: ArticleSearch[] = [];

  constructor(public searchService: SearchService) {}

  searchForArticles() {
    console.log(this.searchPhrase);

    if(!this.searchPhrase) {
      this.searchPhrase = '';
    }
    
    this.searchService.search(0, 10, this.searchPhrase).subscribe(
      (response: ArticleSearch[]) => {
        this.articlesResults = response;
      });
  }

  mouseEnter(index: number) {
    this.hoveredIndex = index;
  }  

  mouseLeave() {
    this.hoveredIndex = null;
  }

}
