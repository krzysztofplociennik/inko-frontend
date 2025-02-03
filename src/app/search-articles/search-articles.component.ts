import { Component, OnInit } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';
import { AuthService } from '../shared/services/auth.service';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent implements OnInit {

  resultsMessage: string = '';

  isHovered: boolean = false;
  hoveredIndex: number | null = null;

  searchPhrase: string = '';
  searchSuggestions: string[] = [];

  articlesResults: ArticleSearch[] = [];

  isLoggedIn: boolean;

  constructor(
    public searchService: SearchService,
    private authService: AuthService,
  ) {
    this.isLoggedIn = false;
   }

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  searchForAutocompletes(event: AutoCompleteEvent) {
    this.searchService.getAutocompletes(event.query).subscribe(
      (response: string[]) => {
        this.searchSuggestions = response;
      }
    )
  }

  searchForArticles() {
    this.searchService.search(0, 10, this.searchPhrase).subscribe(
      (response: ArticleSearch[]) => {
        this.articlesResults = response;
        this.handleResultsMessage(response);
      });
  }

  mouseEnter(index: number) {
    this.hoveredIndex = index;
  }

  mouseLeave() {
    this.hoveredIndex = null;
  }

  handleResultsMessage(response: ArticleSearch[]) {
    if(response.length === 0) {
      this.resultsMessage = 'There were no articles with that searchphrase!';
    } else {
      this.resultsMessage = '';
    }
  } 

}
