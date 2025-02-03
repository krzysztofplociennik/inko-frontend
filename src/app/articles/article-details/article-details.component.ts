import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles-service/articles.service';
import { ArticleDetails } from './article-details';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ArticleType } from 'src/app/new-article/article';
import { ArticleReadService } from 'src/app/shared/services/article-read.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers: [ConfirmationService]
})
export class ArticleDetailsComponent implements OnInit {
  articleID: string = '';
  article: ArticleDetails | null = null;
  isEditMode: boolean = false;
  editedArticle: ArticleDetails = {
    title: '',
    content: '',
    tags: [],
    id: '',
    type: '',
    creationDate: new Date(),
    modificationDate: new Date()
  };

  articleTypes: ArticleType[] = [];
  selectedType: ArticleType = { name: this.editedArticle.type };

  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticlesService,
    private articleReadService: ArticleReadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {
    this.articleID = this.activatedRoute.snapshot.url[1].path;
    this.getArticleDetails();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.articleReadService.fetchAllArticleTypes().subscribe(
      (response: string[]) => {
        response.forEach(element => {
          this.articleTypes.push(
            { name: element }
          )
        });
    });
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  getArticleDetails(): void {
    this.articleService.getArticleDetails(this.articleID).subscribe(
      (response: ArticleDetails) => {
        this.article = response;
        this.editedArticle = { ...response };
      });
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.editedArticle = { ...this.article! };
  }

  cancelEdit(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel? All changes will be lost.',
      header: 'Cancel Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.isEditMode = false;
        this.editedArticle = { ...this.article! };
      }
    });
  }

  updateArticle(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save these changes?',
      header: 'Save Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.articleService.updateArticle(this.articleID, this.editedArticle).subscribe({
          next: (response) => {
            this.article = response;
            this.isEditMode = false;
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Article updated successfully!',
              life: 3000 
            });
          },
          error: (error) => {
            console.error('Error updating article', error);
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Failed to update article.',
              life: 3000 
            });
          }
        });
      }
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
            this.messageService.add({ severity: 'success', summary: 'Accepted', detail: 'The article has been deleted!', life: 3000 });
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

  public areArticleTypesPopulated(): boolean {
    return this.articleTypes.length > 0;
}

}
