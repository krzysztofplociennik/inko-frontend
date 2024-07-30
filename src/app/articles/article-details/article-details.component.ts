import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {

  articleID: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.articleID = activatedRoute.snapshot.url[1].path;
  }


}
