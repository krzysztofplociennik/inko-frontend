import { Component } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent {

  // todo: big refactor - it's a big mess here

  items: any[] | undefined;

  searchPhrase: string = '';

  suggestions: string[] = [];

  isHovered: boolean = false;
  hoveredIndex: number | null = null;

  articlesResults: ArticleSearch[] = [];

  constructor(public searchService: SearchService) {}

  searchForAutocompletes(event: AutoCompleteEvent) {
    this.searchService.getAutocompletes(event.query).subscribe(
      (response: string[]) => {
        this.suggestions = response;
      }
    )      
}

  searchForArticles() {
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
