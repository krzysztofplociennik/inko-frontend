import { Component, Input } from '@angular/core';
import { AllArticlesItem } from './articles-service/all-articles-item';
import { ArticlesService } from './articles-service/articles.service';
import { AuthService } from '../shared/services/auth.service';
import { BackupService } from '../shared/services/backup.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  @Input() 
  isHovered: boolean = false;
  hoveredIndex: number|null = null;

  articlesResults: AllArticlesItem[] = [];

  isLoggedIn: boolean;

  constructor(
    public articlesService: ArticlesService,
    private authService: AuthService,
    private backupService: BackupService
  ) {
    this.getAllArticles();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  getAllArticles() {
    this.articlesService.getAllArticles().subscribe(
      (response: AllArticlesItem[]) => {
        this.articlesResults = response;
      });
  }

  mouseEnter(index: number) {
    this.hoveredIndex = index;
  }  

  mouseLeave() {
    this.hoveredIndex = null;
  }

  doBackup() {
    console.log('do backup');
    this.backupService.doBackup().subscribe();
  }
}
