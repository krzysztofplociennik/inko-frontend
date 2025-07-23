import { Component, OnInit } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';
import { AuthService } from '../shared/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoadingNotifierService } from '../shared/services/loading-notifier-service';
import { SearchFilter } from './search-service/search-filter.api';

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
  articlesResults: ArticleSearch[] = [];

  isArticleResultBeingHovered: boolean = false;
  isUserLoggedIn: boolean;
  shouldSpinnerWork: boolean = false;
  showFilters: boolean = false;

  hoveredIndex: number | null = null;

  autocompleteSuggestions: string[] = [];

  articleTypes = [
    { label: 'All Types', value: null },
    { label: 'Programming', value: 'PROGRAMMING' },
    { label: 'Tools', value: 'TOOLS' },
    { label: 'Database', value: 'DATABASE' },
    { label: 'OS', value: 'OS' },
  ];

  selectedPhrase: string | undefined;
  selectedType: string | undefined;
  selectedDateFrom: Date | undefined;
  selectedDateTo: Date | undefined;
  selectedTags: string[] | undefined;

  constructor(
    public searchService: SearchService,
    private authService: AuthService,
    private loadingNotifierService: LoadingNotifierService
  ) {
    this.isUserLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state) => {
      this.isUserLoggedIn = state;
    });
  }

  searchForAutocompletes(event: AutoCompleteEvent) {
    this.searchService.getAutocompletes(event.query).subscribe(
      (response: string[]) => {
        this.autocompleteSuggestions = response;
      }
    )
  }

  async searchForArticles() {
    this.shouldSpinnerWork = true;
    this.loadingNotifierService.showDelayedMessage();
    try {

      const filter: SearchFilter = {
        searchPhrase: this.selectedPhrase,
        type: this.selectedType,
        tags: this.selectedTags,
        creationDateFrom: this.selectedDateFrom,
        creationDateTo: this.selectedDateTo
      };

      const articles = await firstValueFrom(this.searchService.searchWithFilters(0, 10, filter));
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
    if (response.length === 0) {
      this.resultsMessage = 'There were no articles found!';
    } else {
      this.resultsMessage = '';
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  clearFilters() {
    this.selectedType = undefined;
    this.selectedPhrase = undefined;
    this.selectedDateFrom = undefined;
    this.selectedDateTo = undefined;
    this.selectedTags = undefined;
  }

}
