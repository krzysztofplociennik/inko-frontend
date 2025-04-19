import { Component, Input } from '@angular/core';
import { AllArticlesItem } from './articles-service/all-articles-item';
import { ArticlesService } from './articles-service/articles.service';
import { AuthService } from '../shared/auth/auth.service';
import { ExportService } from '../shared/services/export.service';
import { firstValueFrom } from 'rxjs';
import { LoadingNotifierService } from '../shared/services/loading-notifier-service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  shouldSpinnerWork: boolean = false;

  @Input() 
  isHovered: boolean = false;
  hoveredIndex: number|null = null;

  articlesResults: AllArticlesItem[] = [];

  isLoggedIn: boolean;

  constructor(
    public articlesService: ArticlesService,
    private authService: AuthService,
    private exportService: ExportService,
    private loadingNotifier: LoadingNotifierService
  ) {
    this.isLoggedIn = false;
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
      const response: AllArticlesItem[] = await firstValueFrom(this.articlesService.getAllArticles());
      this.articlesResults = response;
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
}
