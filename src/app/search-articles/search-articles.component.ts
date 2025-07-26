import { Component, OnInit } from '@angular/core';
import { ArticleSearch } from './search-result-item/article-result';
import { SearchService } from './search-service/search.service';
import { AuthService } from '../shared/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoadingNotifierService } from '../shared/services/loading-notifier-service';
import { SearchFilter } from './search-service/search-filter.api';
import { SearchResult } from './search-result-item/search-result.api';
import { ArticleType } from '../new-article/article';
import { ArticleReadService } from '../shared/services/article-read.service';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent implements OnInit {

  resultsMessage: string = '';
  articles: ArticleSearch[] = [];

  isArticleResultBeingHovered: boolean = false;
  isUserLoggedIn: boolean;
  shouldSpinnerWork: boolean = false;
  showFilters: boolean = false;

  hoveredIndex: number | null = null;

  autocompleteSuggestions: string[] = [];

  articleTypes: ArticleType[] = [];

  selectedPhrase: string | undefined;
  selectedType: string | undefined;
  selectedDateFrom: Date | undefined;
  selectedDateTo: Date | undefined;
  selectedTags: string[] | undefined;

  first: number = 0;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalSearchRecords: number = 0;

  constructor(
    public searchService: SearchService,
    private authService: AuthService,
    private loadingNotifierService: LoadingNotifierService,
    private articleReadService: ArticleReadService
  ) {
    this.isUserLoggedIn = false;
  }

  ngOnInit() {
    this.authService.loginState$.subscribe((state) => {
      this.isUserLoggedIn = state;
    });
    this.first = 0;
    this.pageNumber = 0;
    this.articleReadService.fetchArticleTypes().subscribe((types) => {
      this.articleTypes = types;
    })
  }

  searchForAutocompletes(event: AutoCompleteEvent) {
    this.searchService.getAutocompletes(event.query).subscribe(
      (response: string[]) => {
        this.autocompleteSuggestions = response;
      }
    )
  }

  async searchForArticles(pageNumber: number, pageSize: number) {
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

      const result: SearchResult = await firstValueFrom(this.searchService.searchWithFilters(pageNumber, pageSize, filter));
      console.log('articles total size: ' + result.totalElements);

      this.articles = result.articles;
      this.handleResultsMessage(result.articles);
      this.totalSearchRecords = result.totalElements;
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

  onPageChange(event: PageEvent) {
    if (!event) {
      console.warn('(EID: 202507251202) PageEvent is null or undefined!');
      return;
    }

    if (typeof event.page !== 'number' || typeof event.rows !== 'number' || typeof event.first !== 'number') {
      console.warn('(EID: 202507251203) Invalid page event properties:', event);
      return;
    }

    this.first = event.first;
    this.pageSize = event.rows;
    this.pageNumber = event.page;

    this.searchForArticles(event.page, event.rows);
  }
}