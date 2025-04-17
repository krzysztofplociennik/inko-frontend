import { Component, OnInit } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';
import { AuthService } from '../shared/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoadingNotifierService } from '../shared/services/loading-notifier-service';

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

  shouldSpinnerWork: boolean = false;

  constructor(
    public searchService: SearchService,
    private authService: AuthService,
    private loadingNotifierService: LoadingNotifierService
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

  async searchForArticles() {
    this.shouldSpinnerWork = true;
    this.loadingNotifierService.showDelayedMessage();
    try {
      const articles = await firstValueFrom(this.searchService.search(0, 10, this.searchPhrase));
      this.articlesResults = articles;
      this.handleResultsMessage(articles);
    } catch (error) {
      console.log('Error while searching for articles');
    } finally {
      this.loadingNotifierService.clearMessage();
      this.shouldSpinnerWork = false;
    }
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
