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

  isHovered: boolean = false;
  hoveredIndex: number | null = null;

  searchPhrase: string = '';
  searchSuggestions: string[] = [];

  articlesResults: ArticleSearch[] = [];

  isLoggedIn: boolean;

  shouldSpinnerWork: boolean = false;

  showFilters: boolean = false;
    articleTypes = [
    { label: 'All Types', value: null },
    { label: 'Tutorial', value: 'TUTORIAL' },
    { label: 'Guide', value: 'GUIDE' },
    { label: 'Reference', value: 'REFERENCE' },
    { label: 'Troubleshooting', value: 'TROUBLESHOOTING' },
    { label: 'Best Practices', value: 'BEST_PRACTICES' },
    { label: 'Code Example', value: 'CODE_EXAMPLE' },
    { label: 'Configuration', value: 'CONFIGURATION' },
    { label: 'Tool Review', value: 'TOOL_REVIEW' }
  ];
  selectedType: string = '';
  selectedDateFrom: Date = new Date();
  selectedDateTo: Date = new Date();
  selectedTags: String[] = [];

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

  async searchForArticlesWithFilter() {
    this.shouldSpinnerWork = true;
    this.loadingNotifierService.showDelayedMessage();
    try {

      const filter: SearchFilter = {
        page: 0,
        size: 10,
        searchPhrase: this.searchPhrase,
        type: this.selectedType,
        tags: undefined,
        creationDateFrom: this.selectedDateFrom,
        creationDateTo: this.selectedDateTo
      };

      const articles = await firstValueFrom(this.searchService.searchWithFilters(0, 10, this.searchPhrase, filter));
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
      this.resultsMessage = 'There were no articles with that searchphrase!';
    } else {
      this.resultsMessage = '';
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

}
