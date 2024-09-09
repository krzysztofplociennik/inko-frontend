import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles-service/articles.service';
import { ArticleDetails } from './article-details';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ArticleDetailsComponent {

  articleID: string = '';
  article: ArticleDetails | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public articleService: ArticlesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.articleID = this.activatedRoute.snapshot.url[1].path;
    this.getArticleDetails();
  }

  getArticleDetails(): void {
    this.articleService.getArticleDetails(this.articleID).subscribe(
      (response: ArticleDetails) => {
        this.article = response;
      });
  }

  deleteArticle(): void {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.articleService.deleteArticle(this.articleID).subscribe({
          next: () => {
            this.router.navigate(['/articles']);
          },
          error: (e) => {
            console.error('Error deleting article', e);
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'There was an error during deleting the article.', life: 3000 });
          }
        });
      },
    });
  }

}
