import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles-service/articles.service';
import { ArticleDetails } from './article-details';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {

  articleID: string = '';
  article: ArticleDetails | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public articleService: ArticlesService
  ) {
      this.articleID = activatedRoute.snapshot.url[1].path;
      this.getArticleDetails(this.articleID);
  }

  getArticleDetails(id: string): void {
    this.articleService.getArticleDetails(this.articleID).subscribe(
      (response: ArticleDetails) => {
        this.article = response;
      });
  }

  deleteArticle(): void {
    this.articleService.deleteArticle(this.articleID).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: (e) => console.error('Error deleting article', e)
    });
  }

}
