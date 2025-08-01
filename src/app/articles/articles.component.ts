import { Component, Input } from '@angular/core';
import { AllArticlesItem } from './articles-service/all-articles-item';
import { ArticlesService } from './articles-service/articles.service';
import { AuthService } from '../shared/auth/auth.service';
import { ExportService } from '../shared/services/export.service';
import { firstValueFrom } from 'rxjs';
import { LoadingNotifierService } from '../shared/services/loading-notifier-service';
import { PageEvent } from '../shared/pagination/page-event.api';
import { SearchService } from '../search-articles/search-service/search.service';
import { createEmptySearchFilter } from '../search-articles/search-service/search-filter.api';
import { SearchResult } from '../search-articles/search-result-item/search-result.api';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    standalone: false
})
export class ArticlesComponent {

  shouldSpinnerWork: boolean = false;

  @Input()
  isHovered: boolean = false;
  hoveredIndex: number | null = null;

  articlesResults: AllArticlesItem[] = [];

  isLoggedIn: boolean;

  first: number = 0;
  pageNumber: number = 0;
  pageSize: number = 10;
  totalSearchRecords: number = 0;

  constructor(
    public articlesService: ArticlesService,
    private authService: AuthService,
    private exportService: ExportService,
    private loadingNotifier: LoadingNotifierService,
    private searchService: SearchService
  ) {
    this.isLoggedIn = false;
    this.first = 0;
    this.pageNumber = 0;
  }

  async ngOnInit(): Promise<void> {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
    await this.getAllArticles();
  }

  async getAllArticles() {
    this.shouldSpinnerWork = true;
    this.loadingNotifier.showDelayedMessage();

    try {
      const response: SearchResult = await firstValueFrom(this.searchService.search(this.pageNumber, this.pageSize, createEmptySearchFilter()));
      this.articlesResults = response.articles;
      this.totalSearchRecords = response.totalElements;
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      this.loadingNotifier.clearMessage();
      this.shouldSpinnerWork = false;
    }
  }

  mouseEnter(index: number) {
    this.hoveredIndex = index;
  }

  mouseLeave() {
    this.hoveredIndex = null;
  }

  exportWithHTML() {
    this.exportService.exportWithHTML();
  }

  exportWithoutHTML() {
    this.exportService.exportWithoutHTML();
  }

  onPageChange(event: PageEvent) {
    if (!event) {
      console.warn('(EID: 202507281202) PageEvent is null or undefined!');
      return;
    }

    if (typeof event.page !== 'number' || typeof event.rows !== 'number' || typeof event.first !== 'number') {
      console.warn('(EID: 202507281203) Invalid page event properties:', event);
      return;
    }

    this.first = event.first;
    this.pageSize = event.rows;
    this.pageNumber = event.page;

    this.getAllArticles();
  }
}
